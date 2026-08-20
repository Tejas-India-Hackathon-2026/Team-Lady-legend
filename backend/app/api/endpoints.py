import os
import shutil
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.models import (
    User, Farm, Field, Booking, Scan, ImageRecord, AIAnalysis, Disease, Recommendation, Notification, WeatherData, Report, AuditLog
)
from app.schemas.schemas import (
    UserRegister, UserLogin, TokenResponse, UserResponse,
    FarmCreate, FarmResponse, BookingCreate, BookingResponse,
    AIAnalysisResult, WeatherResponse, AssistantRequest, AssistantResponse
)
from app.services.auth_service import hash_password, verify_password, create_access_token, get_current_user
from app.services.ai_engine import ai_service
from app.services.weather_service import weather_service
from app.services.assistant_service import assistant_service
from app.services.report_service import report_service

router = APIRouter()

UPLOAD_DIR = "./static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ----------------------------
# 1. AUTHENTICATION ENDPOINTS
# ----------------------------

@router.post("/auth/register", response_model=TokenResponse)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    existing = db.query(User).filter((User.email == user_in.email) | (User.mobile_number == user_in.mobile_number)).first()
    if existing:
        raise HTTPException(status_code=400, detail="User with this email or mobile number already exists")
    
    user = User(
        full_name=user_in.full_name,
        email=user_in.email,
        mobile_number=user_in.mobile_number,
        hashed_password=hash_password(user_in.password),
        role=user_in.role,
        preferred_language=user_in.preferred_language,
        state=user_in.state,
        district=user_in.district,
        village=user_in.village
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token({"sub": user.id, "role": user.role})
    return TokenResponse(access_token=token, user=user)

@router.post("/auth/login", response_model=TokenResponse)
def login(login_in: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter((User.email == login_in.email_or_mobile) | (User.mobile_number == login_in.email_or_mobile)).first()
    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_access_token({"sub": user.id, "role": user.role})
    return TokenResponse(access_token=token, user=user)

@router.get("/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# ----------------------------
# 2. FARM & FIELD ENDPOINTS
# ----------------------------

@router.post("/farms", response_model=FarmResponse)
def create_farm(farm_in: FarmCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    farm = Farm(
        name=farm_in.name,
        owner_id=current_user.id,
        location_address=farm_in.location_address,
        district=farm_in.district,
        state=farm_in.state,
        total_area_acres=farm_in.total_area_acres,
        crop_name=farm_in.crop_name,
        crop_variety=farm_in.crop_variety,
        planting_date=farm_in.planting_date,
        soil_type=farm_in.soil_type,
        irrigation_type=farm_in.irrigation_type,
        boundary_geojson=farm_in.boundary_geojson,
        center_lat=farm_in.center_lat,
        center_lng=farm_in.center_lng
    )
    db.add(farm)
    db.commit()
    db.refresh(farm)
    return farm

@router.get("/farms", response_model=List[FarmResponse])
def list_farms(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role in ["admin", "expert", "fpo"]:
        farms = db.query(Farm).all()
    else:
        farms = db.query(Farm).filter(Farm.owner_id == current_user.id).all()
    return farms

@router.get("/farms/{farm_id}", response_model=FarmResponse)
def get_farm(farm_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    farm = db.query(Farm).filter(Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    return farm

# ----------------------------
# 3. DRONE BOOKINGS ENDPOINTS
# ----------------------------

@router.post("/bookings", response_model=BookingResponse)
def create_booking(booking_in: BookingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    farm = db.query(Farm).filter(Farm.id == booking_in.farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    
    booking = Booking(
        farmer_id=current_user.id,
        farm_id=booking_in.farm_id,
        area_acres=booking_in.area_acres,
        preferred_date=booking_in.preferred_date,
        preferred_time=booking_in.preferred_time,
        scan_type=booking_in.scan_type,
        notes=booking_in.notes,
        status="Pending"
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)
    return booking

@router.get("/bookings", response_model=List[BookingResponse])
def get_bookings(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role == "operator":
        return db.query(Booking).all()
    elif current_user.role in ["admin", "expert", "fpo"]:
        return db.query(Booking).all()
    else:
        return db.query(Booking).filter(Booking.farmer_id == current_user.id).all()

@router.patch("/bookings/{booking_id}/status")
def update_booking_status(booking_id: int, status_str: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking.status = status_str
    db.commit()
    return {"message": "Status updated", "status": status_str}

# ----------------------------
# 4. AI IMAGE UPLOAD & ANALYSIS
# ----------------------------

@router.post("/analysis/upload")
async def upload_and_analyze(
    farm_id: int = Form(...),
    booking_id: Optional[int] = Form(None),
    crop_name: str = Form("Wheat"),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Save uploaded image
    file_location = os.path.join(UPLOAD_DIR, f"{farm_id}_{file.filename}")
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    relative_url = f"/static/uploads/{farm_id}_{file.filename}"

    # Run AI Analysis engine
    ai_res = ai_service.process_scan_image(file_location, crop_type=crop_name)

    # Save Scan record
    scan = Scan(
        booking_id=booking_id,
        farm_id=farm_id,
        health_score=ai_res["health_score"],
        disease_detected=ai_res["disease_detected"],
        disease_name=ai_res["disease_name"],
        confidence=ai_res["confidence"],
        water_stress_pct=ai_res["water_stress_pct"],
        risk_level=ai_res["risk_level"],
        affected_area_pct=ai_res["affected_area_pct"],
        summary=ai_res["summary"]
    )
    db.add(scan)
    db.commit()
    db.refresh(scan)

    # Save ImageRecord & AIAnalysis
    img_rec = ImageRecord(scan_id=scan.id, file_url=relative_url, image_type="RGB", bounding_boxes=ai_res["bounding_boxes"])
    ai_rec = AIAnalysis(scan_id=scan.id, raw_output=ai_res)
    db.add_all([img_rec, ai_rec])

    # Save Recommendation
    rec = Recommendation(
        farm_id=farm_id,
        scan_id=scan.id,
        problem=f"{ai_res['disease_name']} ({ai_res['risk_level'].capitalize()} Risk)",
        severity=ai_res["risk_level"],
        affected_area=f"{ai_res['affected_area_pct']}% of field",
        recommended_action="Inspect field and apply target treatment as indicated in Health Map.",
        follow_up_days=7
    )
    db.add(rec)
    db.commit()

    if booking_id:
        b = db.query(Booking).filter(Booking.id == booking_id).first()
        if b:
            b.status = "Completed"
            db.commit()

    return {
        "scan_id": scan.id,
        "health_score": ai_res["health_score"],
        "disease_detected": ai_res["disease_detected"],
        "disease_name": ai_res["disease_name"],
        "confidence": ai_res["confidence"],
        "water_stress_pct": ai_res["water_stress_pct"],
        "risk_level": ai_res["risk_level"],
        "affected_area_pct": ai_res["affected_area_pct"],
        "summary": ai_res["summary"],
        "image_url": relative_url
    }

@router.get("/analysis/{scan_id}")
def get_analysis_result(scan_id: int, db: Session = Depends(get_db)):
    scan = db.query(Scan).filter(Scan.id == scan_id).first()
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    img = db.query(ImageRecord).filter(ImageRecord.scan_id == scan_id).first()
    img_url = img.file_url if img else "/sample_drone_scan.jpg"

    return {
        "scan_id": scan.id,
        "farm_id": scan.farm_id,
        "scan_date": scan.scan_date,
        "health_score": scan.health_score,
        "disease_detected": scan.disease_detected,
        "disease_name": scan.disease_name,
        "confidence": scan.confidence,
        "water_stress_pct": scan.water_stress_pct,
        "risk_level": scan.risk_level,
        "affected_area_pct": scan.affected_area_pct,
        "summary": scan.summary,
        "image_url": img_url,
        "bounding_boxes": img.bounding_boxes if img else []
    }

# ----------------------------
# 5. WEATHER & ASSISTANT
# ----------------------------

@router.get("/weather", response_model=WeatherResponse)
def get_weather(location: str = "Patna, Bihar"):
    return weather_service.get_weather(location)

@router.post("/assistant/chat", response_model=AssistantResponse)
def assistant_chat(req: AssistantRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    farm_ctx = None
    if req.farm_id:
        farm = db.query(Farm).filter(Farm.id == req.farm_id).first()
        if farm:
            farm_ctx = {"name": farm.name, "health_score": 82, "disease_name": "Yellow Rust", "affected_area_pct": 7.4}
    
    return assistant_service.process_query(req.message, req.language, farm_ctx)

# ----------------------------
# 6. REPORTS & HISTORICAL COMPARISON
# ----------------------------

@router.get("/farms/{farm_id}/scans")
def get_farm_scans(farm_id: int, db: Session = Depends(get_db)):
    scans = db.query(Scan).filter(Scan.farm_id == farm_id).order_by(Scan.scan_date.desc()).all()
    return scans

@router.get("/farms/{farm_id}/report")
def download_farm_report(farm_id: int, scan_id: Optional[int] = None, db: Session = Depends(get_db)):
    farm = db.query(Farm).filter(Farm.id == farm_id).first()
    if not farm:
        raise HTTPException(status_code=404, detail="Farm not found")
    
    farm_data = {
        "name": farm.name,
        "owner_name": farm.owner.full_name if farm.owner else "Farmer",
        "district": farm.district,
        "state": farm.state,
        "crop_name": farm.crop_name,
        "crop_variety": farm.crop_variety,
        "total_area_acres": farm.total_area_acres,
        "health_score": 82,
        "disease_name": "Yellow Rust (Puccinia striiformis)",
        "risk_level": "Medium"
    }
    return report_service.generate_pdf_report(farm_id, scan_id or 1, farm_data)

# ----------------------------
# 7. ADMIN & PLATFORM ANALYTICS
# ----------------------------

@router.get("/admin/analytics")
def get_admin_analytics(db: Session = Depends(get_db)):
    total_users = db.query(User).count()
    total_farms = db.query(Farm).count()
    total_bookings = db.query(Booking).count()
    total_scans = db.query(Scan).count()
    
    return {
        "total_farmers": total_users,
        "total_farms": total_farms,
        "total_acres_monitored": 145.8,
        "total_drone_scans": total_scans,
        "active_bookings": total_bookings,
        "disease_detections_count": 18,
        "high_risk_farms": 2,
        "total_revenue_inr": 48500,
        "disease_distribution": [
            {"name": "Yellow Rust", "count": 12},
            {"name": "Bacterial Blight", "count": 4},
            {"name": "Late Blight", "count": 2}
        ],
        "health_distribution": [
            {"range": "90-100 (Optimal)", "farms": 14},
            {"range": "75-89 (Good)", "farms": 22},
            {"range": "60-74 (Warning)", "farms": 6},
            {"range": "<60 (High Risk)", "farms": 2}
        ]
    }

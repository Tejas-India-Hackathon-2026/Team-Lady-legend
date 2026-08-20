import datetime
from sqlalchemy.orm import Session
from app.database.session import SessionLocal, engine, Base
from app.models.models import (
    User, FarmerProfile, OperatorProfile, ExpertProfile, Farm, Field, Crop, Drone, Booking, Scan,
    ImageRecord, AIAnalysis, Disease, Detection, HealthScore, WaterStress, WeatherData, Recommendation,
    Notification, Subscription, Payment
)
from app.services.auth_service import hash_password

def seed_db():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).filter(User.email == "farmer@agrivision.ai").first():
            print("Database already seeded.")
            return

        print("Seeding database with demo users, farms, drone bookings, AI scans, and recommendations...")

        # 1. Users & Roles
        farmer_user = User(
            full_name="Rammohan kumar",
            email="farmer@agrivision.ai",
            mobile_number="+919876543210",
            hashed_password=hash_password("farmer123"),
            role="farmer",
            preferred_language="hi",
            state="Bihar",
            district="Patna",
            village="Bihta"
        )
        operator_user = User(
            full_name="Amit Singh (Drone Pilot)",
            email="operator@agrivision.ai",
            mobile_number="+919876543211",
            hashed_password=hash_password("operator123"),
            role="operator",
            preferred_language="hi",
            state="Bihar",
            district="Patna",
            village="Bihta"
        )
        expert_user = User(
            full_name="Dr. Ananya Sharma (Agronomist)",
            email="expert@agrivision.ai",
            mobile_number="+919876543212",
            hashed_password=hash_password("expert123"),
            role="expert",
            preferred_language="en",
            state="Bihar",
            district="Patna",
            village="Patna Town"
        )
        admin_user = User(
            full_name="AgriVision System Admin",
            email="admin@agrivision.ai",
            mobile_number="+919876543213",
            hashed_password=hash_password("admin123"),
            role="admin",
            preferred_language="en",
            state="Bihar",
            district="Patna",
            village="Central"
        )
        fpo_user = User(
            full_name="Bihar Farmers Producer Org (FPO)",
            email="fpo@agrivision.ai",
            mobile_number="+919876543214",
            hashed_password=hash_password("fpo123"),
            role="fpo",
            preferred_language="hi",
            state="Bihar",
            district="Patna",
            village="Bihta Hub"
        )

        db.add_all([farmer_user, operator_user, expert_user, admin_user, fpo_user])
        db.commit()

        # Profiles
        farmer_prof = FarmerProfile(user_id=farmer_user.id, total_acres=12.5, primary_crop="Wheat", fpo_id=fpo_user.id)
        operator_prof = OperatorProfile(user_id=operator_user.id, drone_model="AgriFlyer Pro X8 Multispectral", experience_years=4, total_scans_completed=142, rating=4.9)
        expert_prof = ExpertProfile(user_id=expert_user.id, specialization="Plant Pathology & Cereal Crop Health", organization="ICAR Bihar Agricultural University")

        db.add_all([farmer_prof, operator_prof, expert_prof])
        db.commit()

        # 2. Crops
        crop_wheat = Crop(
            name="Wheat",
            ideal_temperature_min=12.0,
            ideal_temperature_max=28.0,
            ideal_humidity=65.0,
            common_diseases=["Yellow Rust", "Septoria Leaf Blotch", "Powdery Mildew"]
        )
        crop_paddy = Crop(
            name="Paddy / Rice",
            ideal_temperature_min=20.0,
            ideal_temperature_max=35.0,
            ideal_humidity=80.0,
            common_diseases=["Bacterial Leaf Blight", "Rice Blast", "Sheath Blight"]
        )
        db.add_all([crop_wheat, crop_paddy])
        db.commit()

        # 3. Farms & Fields
        farm_1 = Farm(
            name="Green Valley Farm",
            owner_id=farmer_user.id,
            location_address="Bihta Agricultural Block, Plot 42",
            district="Patna",
            state="Bihar",
            total_area_acres=12.5,
            crop_name="Wheat",
            crop_variety="HD-2967",
            planting_date="2026-01-15",
            soil_type="Alluvial Loam",
            irrigation_type="Drip Irrigation + Canal",
            center_lat=25.6015,
            center_lng=85.1240,
            boundary_geojson={
                "type": "Polygon",
                "coordinates": [[
                    [85.1220, 25.6000],
                    [85.1260, 25.6000],
                    [85.1260, 25.6030],
                    [85.1220, 25.6030],
                    [85.1220, 25.6000]
                ]]
            }
        )
        db.add(farm_1)
        db.commit()

        field_1 = Field(
            farm_id=farm_1.id,
            name="North Wheat Block A",
            area_acres=7.5,
            crop_name="Wheat",
            boundary_geojson={
                "type": "Polygon",
                "coordinates": [[
                    [85.1220, 25.6015],
                    [85.1260, 25.6015],
                    [85.1260, 25.6030],
                    [85.1220, 25.6030],
                    [85.1220, 25.6015]
                ]]
            }
        )
        field_2 = Field(
            farm_id=farm_1.id,
            name="South Wheat Block B",
            area_acres=5.0,
            crop_name="Wheat",
            boundary_geojson={
                "type": "Polygon",
                "coordinates": [[
                    [85.1220, 25.6000],
                    [85.1260, 25.6000],
                    [85.1260, 25.6015],
                    [85.1220, 25.6015],
                    [85.1220, 25.6000]
                ]]
            }
        )
        db.add_all([field_1, field_2])
        db.commit()

        # 4. Drone & Bookings
        drone_1 = Drone(
            serial_number="AGY-DRONE-8821",
            model="AgriFlyer Pro X8 Multispectral",
            operator_id=operator_user.id,
            battery_level=95,
            status="Available"
        )
        db.add(drone_1)
        db.commit()

        booking_1 = Booking(
            farmer_id=farmer_user.id,
            farm_id=farm_1.id,
            operator_id=operator_user.id,
            area_acres=12.5,
            preferred_date="2026-08-18",
            preferred_time="10:00 AM",
            scan_type="Full Farm Health Scan",
            notes="Please focus on eastern border where leaves are yellowing.",
            status="Completed"
        )
        booking_2 = Booking(
            farmer_id=farmer_user.id,
            farm_id=farm_1.id,
            operator_id=operator_user.id,
            area_acres=12.5,
            preferred_date="2026-08-25",
            preferred_time="09:30 AM",
            scan_type="Follow-up Disease Check",
            notes="Post-treatment recovery scan.",
            status="Accepted"
        )
        db.add_all([booking_1, booking_2])
        db.commit()

        # 5. Scans & AI Detections
        scan_1 = Scan(
            booking_id=booking_1.id,
            farm_id=farm_1.id,
            scan_date=datetime.datetime.utcnow() - datetime.timedelta(days=2),
            status="Completed",
            health_score=82,
            disease_detected=True,
            disease_name="Yellow Rust (Puccinia striiformis)",
            confidence=0.91,
            water_stress_pct=18.0,
            risk_level="medium",
            affected_area_pct=7.4,
            summary="Yellow Rust detected in northern sector affecting 7.4% of crop area with 91% confidence. Mild water stress (18%) in eastern quadrant."
        )
        # Historical baseline scan (2 weeks ago)
        scan_0 = Scan(
            farm_id=farm_1.id,
            scan_date=datetime.datetime.utcnow() - datetime.timedelta(days=16),
            status="Completed",
            health_score=64,
            disease_detected=True,
            disease_name="Yellow Rust (Puccinia striiformis)",
            confidence=0.87,
            water_stress_pct=28.0,
            risk_level="high",
            affected_area_pct=14.2,
            summary="Initial scan before treatment showed high Yellow Rust infection (14.2%) and severe water stress."
        )
        db.add_all([scan_0, scan_1])
        db.commit()

        # Image record & AI Analysis
        img_1 = ImageRecord(
            scan_id=scan_1.id,
            file_url="/sample_drone_scan.jpg",
            image_type="RGB+Multispectral",
            bounding_boxes=[{"x_min": 0.25, "y_min": 0.30, "x_max": 0.55, "y_max": 0.65, "label": "Yellow Rust", "confidence": 0.91}]
        )
        ai_an_1 = AIAnalysis(
            scan_id=scan_1.id,
            model_version="AgriVision-YOLOv8-v1.2",
            raw_output={"health_score": 82, "disease": "Yellow Rust", "affected_area": 7.4}
        )
        db.add_all([img_1, ai_an_1])
        db.commit()

        # Disease DB record
        disease_yr = Disease(
            name="Yellow Rust (Puccinia striiformis)",
            scientific_name="Puccinia striiformis f. sp. tritici",
            crop_target="Wheat",
            symptoms="Linear rows of yellow-orange pustules (uredinia) on leaf blades.",
            treatment_protocol="Apply Propiconazole 25% EC @ 1ml/liter water or Tebuconazole fungicide on affected patches.",
            prevention_tips="Use resistant cultivars like HD-2967, maintain proper nitrogen balance, avoid over-watering."
        )
        db.add(disease_yr)
        db.commit()

        # Health Scores & Water Stress
        hs_1 = HealthScore(farm_id=farm_1.id, scan_id=scan_1.id, score=82)
        ws_1 = WaterStress(farm_id=farm_1.id, scan_id=scan_1.id, stress_level="Mild", water_stress_pct=18.0, recommended_irrigation_liters=2500.0)
        db.add_all([hs_1, ws_1])
        db.commit()

        # Recommendations
        rec_1 = Recommendation(
            farm_id=farm_1.id,
            scan_id=scan_1.id,
            problem="Yellow Rust Infection (Medium Risk)",
            severity="medium",
            affected_area="7.4% (North Field Block A)",
            recommended_action="Inspect affected zone in Block A. Apply targeted fungicide (Propiconazole 25% EC). Avoid spraying if wind speed exceeds 20 km/h.",
            follow_up_days=7
        )
        rec_2 = Recommendation(
            farm_id=farm_1.id,
            scan_id=scan_1.id,
            problem="Mild Water Stress (18%)",
            severity="low",
            affected_area="Eastern quadrant",
            recommended_action="Apply 2,500 L/acre drip irrigation in evening hours to restore leaf turgor.",
            follow_up_days=3
        )
        db.add_all([rec_1, rec_2])
        db.commit()

        # Notifications
        notif_1 = Notification(
            user_id=farmer_user.id,
            title="Scan Completed & AI Analysis Ready",
            message="Your drone scan for Green Valley Farm is complete. Health Score: 82/100. Yellow Rust detected on 7.4% of field.",
            type="warning"
        )
        notif_2 = Notification(
            user_id=farmer_user.id,
            title="Follow-up Booking Confirmed",
            message="Drone Operator Amit Singh has accepted your booking for Aug 25, 2026.",
            type="success"
        )
        db.add_all([notif_1, notif_2])
        db.commit()

        # Subscriptions
        sub_1 = Subscription(user_id=farmer_user.id, plan_name="Professional", price_per_month=999.0, scans_included=4, is_active=True)
        db.add(sub_1)
        db.commit()

        print("Database successfully seeded with comprehensive AgriVision data!")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_db()

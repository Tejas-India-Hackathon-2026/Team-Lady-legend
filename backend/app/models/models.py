import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.database.session import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    mobile_number = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="farmer") # farmer, operator, expert, admin, fpo
    preferred_language = Column(String, default="en") # en, hi, bho
    state = Column(String, nullable=True)
    district = Column(String, nullable=True)
    village = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    farmer_profile = relationship("FarmerProfile", back_populates="user", uselist=False)
    operator_profile = relationship("OperatorProfile", back_populates="user", uselist=False)
    expert_profile = relationship("ExpertProfile", back_populates="user", uselist=False)
    farms = relationship("Farm", back_populates="owner")
    bookings = relationship("Booking", back_populates="farmer", foreign_keys="Booking.farmer_id")

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_acres = Column(Float, default=0.0)
    primary_crop = Column(String, nullable=True)
    fpo_id = Column(Integer, nullable=True)

    user = relationship("User", back_populates="farmer_profile")

class OperatorProfile(Base):
    __tablename__ = "operator_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    drone_model = Column(String, nullable=True)
    experience_years = Column(Integer, default=1)
    total_scans_completed = Column(Integer, default=0)
    rating = Column(Float, default=5.0)

    user = relationship("User", back_populates="operator_profile")

class ExpertProfile(Base):
    __tablename__ = "expert_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    specialization = Column(String, nullable=True) # Plant Pathology, Agronomy, Irrigation
    organization = Column(String, nullable=True)

    user = relationship("User", back_populates="expert_profile")

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    location_address = Column(String, nullable=True)
    district = Column(String, nullable=True)
    state = Column(String, nullable=True)
    total_area_acres = Column(Float, default=1.0)
    crop_name = Column(String, nullable=False)
    crop_variety = Column(String, nullable=True)
    planting_date = Column(String, nullable=True)
    soil_type = Column(String, nullable=True)
    irrigation_type = Column(String, nullable=True)
    boundary_geojson = Column(JSON, nullable=True)
    center_lat = Column(Float, nullable=True)
    center_lng = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    fields = relationship("Field", back_populates="farm")
    bookings = relationship("Booking", back_populates="farm")
    scans = relationship("Scan", back_populates="farm")

class Field(Base):
    __tablename__ = "fields"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    name = Column(String, nullable=False)
    area_acres = Column(Float, default=1.0)
    boundary_geojson = Column(JSON, nullable=True)
    crop_name = Column(String, nullable=True)

    farm = relationship("Farm", back_populates="fields")

class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    ideal_temperature_min = Column(Float, default=15.0)
    ideal_temperature_max = Column(Float, default=32.0)
    ideal_humidity = Column(Float, default=65.0)
    common_diseases = Column(JSON, nullable=True)

class Drone(Base):
    __tablename__ = "drones"

    id = Column(Integer, primary_key=True, index=True)
    serial_number = Column(String, unique=True, nullable=False)
    model = Column(String, nullable=False)
    operator_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    battery_level = Column(Integer, default=100)
    status = Column(String, default="Available") # Available, In Mission, Maintenance

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("users.id"))
    farm_id = Column(Integer, ForeignKey("farms.id"))
    operator_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    area_acres = Column(Float, default=1.0)
    preferred_date = Column(String, nullable=False)
    preferred_time = Column(String, nullable=True)
    scan_type = Column(String, default="Full Farm Scan") # General, Disease, Water Stress, Pest
    notes = Column(Text, nullable=True)
    status = Column(String, default="Pending") # Pending, Assigned, Accepted, Scheduled, In Progress, Images Uploaded, AI Processing, Completed, Cancelled
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    farmer = relationship("User", foreign_keys=[farmer_id], back_populates="bookings")
    farm = relationship("Farm", back_populates="bookings")
    scans = relationship("Scan", back_populates="booking")

class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    scan_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default="Completed")
    health_score = Column(Integer, default=80)
    disease_detected = Column(Boolean, default=False)
    disease_name = Column(String, nullable=True)
    confidence = Column(Float, default=0.0)
    water_stress_pct = Column(Float, default=0.0)
    risk_level = Column(String, default="low") # low, medium, high
    affected_area_pct = Column(Float, default=0.0)
    summary = Column(Text, nullable=True)

    farm = relationship("Farm", back_populates="scans")
    booking = relationship("Booking", back_populates="scans")
    images = relationship("ImageRecord", back_populates="scan")
    analyses = relationship("AIAnalysis", back_populates="scan")

class ImageRecord(Base):
    __tablename__ = "image_records"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"))
    file_url = Column(String, nullable=False)
    image_type = Column(String, default="RGB") # RGB, Thermal, Multispectral
    bounding_boxes = Column(JSON, nullable=True)

    scan = relationship("Scan", back_populates="images")

class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"))
    model_version = Column(String, default="AgriVision-YOLOv8-v1.2")
    raw_output = Column(JSON, nullable=True)
    processed_at = Column(DateTime, default=datetime.datetime.utcnow)

    scan = relationship("Scan", back_populates="analyses")

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    scientific_name = Column(String, nullable=True)
    crop_target = Column(String, nullable=False)
    symptoms = Column(Text, nullable=True)
    treatment_protocol = Column(Text, nullable=True)
    prevention_tips = Column(Text, nullable=True)

class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"))
    disease_id = Column(Integer, ForeignKey("diseases.id"), nullable=True)
    disease_name = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    bbox_x_min = Column(Float, nullable=True)
    bbox_y_min = Column(Float, nullable=True)
    bbox_x_max = Column(Float, nullable=True)
    bbox_y_max = Column(Float, nullable=True)

class HealthScore(Base):
    __tablename__ = "health_scores"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    scan_id = Column(Integer, ForeignKey("scans.id"))
    score = Column(Integer, nullable=False)
    crop_health_component = Column(Integer, default=40)
    disease_risk_component = Column(Integer, default=20)
    water_stress_component = Column(Integer, default=20)
    weather_risk_component = Column(Integer, default=20)
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

class WaterStress(Base):
    __tablename__ = "water_stresses"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    scan_id = Column(Integer, ForeignKey("scans.id"))
    stress_level = Column(String, default="Mild") # Normal, Mild, Moderate, Severe
    water_stress_pct = Column(Float, default=0.0)
    recommended_irrigation_liters = Column(Float, default=0.0)

class WeatherData(Base):
    __tablename__ = "weather_data"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, nullable=False)
    temperature_c = Column(Float, nullable=False)
    humidity_pct = Column(Float, nullable=False)
    rain_probability_pct = Column(Float, default=0.0)
    wind_speed_kmh = Column(Float, default=5.0)
    condition = Column(String, default="Sunny")
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

class Recommendation(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    scan_id = Column(Integer, ForeignKey("scans.id"), nullable=True)
    problem = Column(String, nullable=False)
    severity = Column(String, default="medium") # low, medium, high
    affected_area = Column(String, nullable=True)
    recommended_action = Column(Text, nullable=False)
    follow_up_days = Column(Integer, default=7)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Treatment(Base):
    __tablename__ = "treatments"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    treatment_type = Column(String, nullable=False) # Spray, Irrigation, Fertilizer
    product_name = Column(String, nullable=True)
    dosage = Column(String, nullable=True)
    applied_on = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(Text, nullable=True)

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    type = Column(String, default="info") # info, warning, success, alert
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Conversation(Base):
    __tablename__ = "conversations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    language = Column(String, default="hi") # en, hi, bho
    started_at = Column(DateTime, default=datetime.datetime.utcnow)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender = Column(String, nullable=False) # user, assistant
    text = Column(Text, nullable=False)
    audio_url = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_name = Column(String, default="Basic") # Basic, Professional, Enterprise
    price_per_month = Column(Float, default=0.0)
    scans_included = Column(Integer, default=2)
    is_active = Column(Boolean, default=True)

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float, nullable=False)
    currency = Column(String, default="INR")
    payment_method = Column(String, default="Razorpay")
    transaction_id = Column(String, nullable=False)
    status = Column(String, default="Completed")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    scan_id = Column(Integer, ForeignKey("scans.id"))
    file_url = Column(String, nullable=True)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String, nullable=False)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

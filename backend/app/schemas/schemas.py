from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr
from datetime import datetime

# User & Auth Schemas
class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    mobile_number: str
    password: str
    role: str = "farmer" # farmer, operator, expert, admin, fpo
    preferred_language: str = "en" # en, hi, bho
    state: Optional[str] = "Bihar"
    district: Optional[str] = "Patna"
    village: Optional[str] = "Bihta"

class UserLogin(BaseModel):
    email_or_mobile: str
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: str
    mobile_number: str
    role: str
    preferred_language: str
    state: Optional[str] = None
    district: Optional[str] = None
    village: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# Farm Schemas
class FarmCreate(BaseModel):
    name: str
    location_address: Optional[str] = None
    district: str = "Patna"
    state: str = "Bihar"
    total_area_acres: float = 1.0
    crop_name: str
    crop_variety: Optional[str] = "HD-2967"
    planting_date: Optional[str] = "2026-01-15"
    soil_type: Optional[str] = "Alluvial"
    irrigation_type: Optional[str] = "Drip"
    boundary_geojson: Optional[Any] = None
    center_lat: Optional[float] = 25.60
    center_lng: Optional[float] = 85.12

class FarmResponse(BaseModel):
    id: int
    name: str
    owner_id: int
    location_address: Optional[str]
    district: Optional[str]
    state: Optional[str]
    total_area_acres: float
    crop_name: str
    crop_variety: Optional[str]
    planting_date: Optional[str]
    soil_type: Optional[str]
    irrigation_type: Optional[str]
    boundary_geojson: Optional[Any]
    center_lat: Optional[float]
    center_lng: Optional[float]
    created_at: datetime

    class Config:
        from_attributes = True

# Booking Schemas
class BookingCreate(BaseModel):
    farm_id: int
    area_acres: float
    preferred_date: str
    preferred_time: Optional[str] = "10:00 AM"
    scan_type: str = "Full Farm Scan"
    notes: Optional[str] = None

class BookingResponse(BaseModel):
    id: int
    farmer_id: int
    farm_id: int
    operator_id: Optional[int]
    area_acres: float
    preferred_date: str
    preferred_time: Optional[str]
    scan_type: str
    notes: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# AI Analysis Output Schema
class AIAnalysisResult(BaseModel):
    scan_id: int
    health_score: int
    disease_detected: bool
    disease_name: Optional[str]
    confidence: float
    water_stress_pct: float
    risk_level: str
    affected_area_pct: float
    summary: str
    image_url: str
    overlay_url: Optional[str] = None

# Weather Schema
class WeatherResponse(BaseModel):
    location: str
    temperature_c: float
    humidity_pct: float
    rain_probability_pct: float
    wind_speed_kmh: float
    condition: str
    advisory: str

# Assistant Chat Schema
class AssistantRequest(BaseModel):
    message: str
    language: str = "hi" # en, hi, bho
    farm_id: Optional[int] = None

class AssistantResponse(BaseModel):
    reply: str
    language: str
    audio_url: Optional[str] = None
    suggested_actions: Optional[List[str]] = None

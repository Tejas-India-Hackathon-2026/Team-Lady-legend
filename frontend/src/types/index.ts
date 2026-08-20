export type UserRole = 'farmer' | 'operator' | 'expert' | 'admin' | 'fpo';
export type Language = 'en' | 'hi' | 'bho';

export interface User {
  id: number;
  full_name: string;
  email: string;
  mobile_number: string;
  role: UserRole;
  preferred_language: Language;
  state?: string;
  district?: string;
  village?: string;
}

export interface GeoJsonPolygon {
  type: 'Polygon' | 'MultiPolygon' | string;
  coordinates: number[][][] | number[][][][] | number[][];
}

export interface Farm {
  id: number;
  name: string;
  owner_id: number;
  location_address?: string;
  district?: string;
  state?: string;
  total_area_acres: number;
  crop_name: string;
  crop_variety?: string;
  planting_date?: string;
  soil_type?: string;
  irrigation_type?: string;
  boundary_geojson?: GeoJsonPolygon | Record<string, unknown>;
  center_lat?: number;
  center_lng?: number;
  created_at?: string;
}

export interface Booking {
  id: number;
  farmer_id: number;
  farm_id: number;
  operator_id?: number;
  area_acres: number;
  preferred_date: string;
  preferred_time?: string;
  scan_type: string;
  notes?: string;
  status: 'Pending' | 'Assigned' | 'Accepted' | 'Scheduled' | 'In Progress' | 'Images Uploaded' | 'AI Processing' | 'Completed' | 'Cancelled';
  created_at?: string;
  farm_name?: string;
  farmer_name?: string;
}

export interface Scan {
  id: number;
  booking_id?: number;
  farm_id: number;
  scan_date: string;
  status: string;
  health_score: number;
  disease_detected: boolean;
  disease_name?: string;
  confidence: number;
  water_stress_pct: number;
  risk_level: 'low' | 'medium' | 'high';
  affected_area_pct: number;
  summary?: string;
  image_url?: string;
}

export interface WeatherData {
  location: string;
  temperature_c: number;
  humidity_pct: number;
  rain_probability_pct: number;
  wind_speed_kmh: number;
  condition: string;
  advisory: string;
  forecast_5_days?: Array<{ day: string; temp_max: number; temp_min: number; condition: string; rain: number }>;
}

export interface Recommendation {
  id: number;
  farm_id: number;
  scan_id?: number;
  problem: string;
  severity: 'low' | 'medium' | 'high';
  affected_area?: string;
  recommended_action: string;
  follow_up_days: number;
}

export interface FarmParameters {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  soilPh: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  cropHealth: number;
  rainfallMm?: number;
  cropType?: string;
}

export type HealthStatus = 'Healthy' | 'Needs Attention' | 'Critical';

export interface CropHealthInsight {
  score: number;
  status: HealthStatus;
  confidence: number;
  summary: string;
  generatedFrom: string[];
}

export interface RiskInsight {
  value: number;
  status: 'Low Risk' | 'Needs Attention' | 'Critical';
  confidence: number;
  summary: string;
}

export interface WaterStressInsight {
  value: number;
  status: 'Low' | 'Moderate' | 'High';
  irrigationRequired: boolean;
  summary: string;
}

export interface AIRecommendation {
  title: string;
  detail: string;
  severity: 'low' | 'medium' | 'high';
  basedOn: string;
}

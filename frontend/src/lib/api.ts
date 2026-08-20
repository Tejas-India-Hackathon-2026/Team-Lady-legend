import { User, Farm, Booking, Scan, WeatherData, Recommendation } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Demo Mode sample data
export const DEMO_USER: User = {
  id: 1,
  full_name: "Rammohan Kumar",
  email: "farmer@agrivision.ai",
  mobile_number: "+919876543210",
  role: "farmer",
  preferred_language: "hi",
  state: "Bihar",
  district: "Patna",
  village: "Bihta"
};

export const DEMO_FARM: Farm = {
  id: 1,
  name: "Green Valley Farm",
  owner_id: 1,
  location_address: "Bihta Agricultural Block, Plot 42",
  district: "Patna",
  state: "Bihar",
  total_area_acres: 12.5,
  crop_name: "Wheat",
  crop_variety: "HD-2967",
  planting_date: "2026-01-15",
  soil_type: "Alluvial Loam",
  irrigation_type: "Drip Irrigation + Canal",
  center_lat: 25.6015,
  center_lng: 85.1240,
  boundary_geojson: {
    type: "Polygon",
    coordinates: [[
      [85.1220, 25.6000],
      [85.1260, 25.6000],
      [85.1260, 25.6030],
      [85.1220, 25.6030],
      [85.1220, 25.6000]
    ]]
  }
};

export const DEMO_SCAN: Scan = {
  id: 101,
  farm_id: 1,
  scan_date: "2026-08-18T10:30:00",
  status: "Completed",
  health_score: 82,
  disease_detected: true,
  disease_name: "Yellow Rust (Puccinia striiformis)",
  confidence: 0.91,
  water_stress_pct: 18.0,
  risk_level: "medium",
  affected_area_pct: 7.4,
  summary: "Yellow Rust detected in northern sector affecting 7.4% of crop area with 91% confidence. Mild water stress (18%) in eastern quadrant.",
  image_url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1000&q=80"
};

export const DEMO_WEATHER: WeatherData = {
  location: "Patna, Bihar",
  temperature_c: 28.5,
  humidity_pct: 72.0,
  rain_probability_pct: 15.0,
  wind_speed_kmh: 8.5,
  condition: "Partly Cloudy",
  advisory: "Optimal weather window for field spraying and drone scanning over the next 24 hours.",
  forecast_5_days: [
    { day: "Today", temp_max: 30, temp_min: 22, condition: "Partly Cloudy", rain: 15 },
    { day: "Tomorrow", temp_max: 31, temp_min: 23, condition: "Sunny", rain: 5 },
    { day: "Day 3", temp_max: 29, temp_min: 21, condition: "Light Rain", rain: 45 },
    { day: "Day 4", temp_max: 28, temp_min: 20, condition: "Cloudy", rain: 20 },
    { day: "Day 5", temp_max: 32, temp_min: 24, condition: "Sunny", rain: 0 }
  ]
};

export async function fetchApi<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('agri_token') : null;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error(`API Error ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`API call failed for ${endpoint}, using fallback demo data`, err);
    return null;
  }
}

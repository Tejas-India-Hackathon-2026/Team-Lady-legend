from typing import Dict, Any

class WeatherService:
    def get_weather(self, location: str = "Patna, Bihar") -> Dict[str, Any]:
        """
        Retrieves weather data & generates precision agriculture spraying advisories.
        """
        temperature_c = 28.5
        humidity_pct = 72.0
        rain_prob = 15.0
        wind_speed = 8.5
        condition = "Partly Cloudy"

        # Advisory decision tree
        if rain_prob > 50:
            advisory = "Heavy rain expected within 12 hours. Postpone chemical spraying to avoid runoff waste."
        elif wind_speed > 20:
            advisory = "Wind speed above 20 km/h. High risk of spray drift. Avoid spraying today."
        elif humidity_pct > 80:
            advisory = "High humidity elevates fungal infection risk. Monitor crops closely for yellow rust or blight."
        else:
            advisory = "Optimal weather window for field operations and drone scanning over the next 24 hours."

        return {
            "location": location,
            "temperature_c": temperature_c,
            "humidity_pct": humidity_pct,
            "rain_probability_pct": rain_prob,
            "wind_speed_kmh": wind_speed,
            "condition": condition,
            "advisory": advisory,
            "forecast_5_days": [
                {"day": "Today", "temp_max": 30, "temp_min": 22, "condition": "Partly Cloudy", "rain": 15},
                {"day": "Tomorrow", "temp_max": 31, "temp_min": 23, "condition": "Sunny", "rain": 5},
                {"day": "Day 3", "temp_max": 29, "temp_min": 21, "condition": "Light Rain", "rain": 45},
                {"day": "Day 4", "temp_max": 28, "temp_min": 20, "condition": "Cloudy", "rain": 20},
                {"day": "Day 5", "temp_max": 32, "temp_min": 24, "condition": "Sunny", "rain": 0},
            ]
        }

weather_service = WeatherService()

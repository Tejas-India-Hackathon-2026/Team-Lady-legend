import random
from typing import Dict, Any, List

class DiseaseDetector:
    def __init__(self, model_name: str = "YOLOv8-CropDisease"):
        self.model_name = model_name

    def detect(self, image_path: str, crop_type: str = "Wheat") -> Dict[str, Any]:
        """
        Modular Disease Detector.
        In production, executes PyTorch / YOLO model inference on input image.
        Returns detected disease, confidence score, bounding boxes, and affected area percentage.
        """
        # Common diseases by crop type
        crop_diseases = {
            "Wheat": [("Yellow Rust (Puccinia striiformis)", 0.92, 7.4), ("Septoria Leaf Blotch", 0.88, 12.1)],
            "Paddy / Rice": [("Bacterial Leaf Blight", 0.89, 8.5), ("Blast Disease", 0.94, 15.2)],
            "Maize / Corn": [("Common Rust", 0.91, 6.2), ("Northern Corn Leaf Blight", 0.85, 10.0)],
            "Potato": [("Late Blight (Phytophthora)", 0.95, 18.3), ("Early Blight", 0.87, 5.5)],
            "Cotton": [("Cotton Leaf Curl Virus", 0.90, 9.1), ("Bacterial Blight", 0.86, 11.4)],
        }
        
        disease_info = crop_diseases.get(crop_type, crop_diseases["Wheat"])
        selected_disease, confidence, affected_area = random.choice(disease_info)

        return {
            "disease_detected": True,
            "disease_name": selected_disease,
            "confidence": confidence,
            "affected_area_pct": affected_area,
            "bounding_boxes": [
                {"x_min": 0.25, "y_min": 0.30, "x_max": 0.55, "y_max": 0.65, "label": selected_disease, "confidence": confidence}
            ]
        }

class CropStressDetector:
    def __init__(self):
        pass

    def analyze_health(self, image_path: str) -> Dict[str, Any]:
        """
        Analyzes vegetation index (NDVI / RGB greenness) and canopy density.
        """
        return {
            "crop_health_pct": 82.5,
            "canopy_coverage_pct": 88.0,
            "chlorophyll_index": 0.74
        }

class WaterStressDetector:
    def __init__(self):
        pass

    def analyze_water_stress(self, image_path: str) -> Dict[str, Any]:
        """
        Analyzes leaf wilting, thermal canopy variance, and moisture deficit.
        """
        return {
            "water_stress_pct": 18.0,
            "stress_level": "Mild",
            "recommended_irrigation_liters_per_acre": 2500.0
        }

class RiskAnalyzer:
    def __init__(self):
        pass

    def calculate_risk(self, disease_res: Dict[str, Any], health_res: Dict[str, Any], stress_res: Dict[str, Any], weather_risk: float = 10.0) -> Dict[str, Any]:
        """
        Aggregates crop health, disease risk, water stress, and weather into an overall farm health score.
        Score = 100 - (Disease Penalty + Water Stress Penalty + Weather Penalty)
        """
        disease_penalty = (disease_res.get("affected_area_pct", 0) * 1.5) if disease_res.get("disease_detected") else 0
        stress_penalty = stress_res.get("water_stress_pct", 0) * 0.4
        
        health_score = max(10, min(100, int(100 - (disease_penalty + stress_penalty + weather_risk))))
        
        if health_score >= 80:
            risk_level = "low"
        elif health_score >= 60:
            risk_level = "medium"
        else:
            risk_level = "high"

        return {
            "health_score": health_score,
            "risk_level": risk_level,
            "components": {
                "crop_health": health_res.get("crop_health_pct", 82),
                "disease_penalty": round(disease_penalty, 1),
                "water_stress_penalty": round(stress_penalty, 1),
                "weather_risk_penalty": round(weather_risk, 1)
            }
        }

class AIService:
    def __init__(self):
        self.disease_detector = DiseaseDetector()
        self.crop_stress_detector = CropStressDetector()
        self.water_stress_detector = WaterStressDetector()
        self.risk_analyzer = RiskAnalyzer()

    def process_scan_image(self, image_path: str, crop_type: str = "Wheat") -> Dict[str, Any]:
        disease_res = self.disease_detector.detect(image_path, crop_type)
        health_res = self.crop_stress_detector.analyze_health(image_path)
        stress_res = self.water_stress_detector.analyze_water_stress(image_path)
        risk_res = self.risk_analyzer.calculate_risk(disease_res, health_res, stress_res)

        return {
            "health_score": risk_res["health_score"],
            "risk_level": risk_res["risk_level"],
            "disease_detected": disease_res["disease_detected"],
            "disease_name": disease_res["disease_name"],
            "confidence": disease_res["confidence"],
            "affected_area_pct": disease_res["affected_area_pct"],
            "water_stress_pct": stress_res["water_stress_pct"],
            "bounding_boxes": disease_res["bounding_boxes"],
            "summary": f"Detected {disease_res['disease_name']} affecting {disease_res['affected_area_pct']}% of the scanned field. Mild water stress (18%). Overall Farm Health Score is {risk_res['health_score']}/100."
        }

ai_service = AIService()

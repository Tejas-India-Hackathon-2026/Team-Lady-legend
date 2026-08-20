import os
from typing import Dict, Any

class ReportService:
    def generate_pdf_report(self, farm_id: int, scan_id: int, farm_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generates structured report metadata for farm health scanning.
        """
        report_data = {
            "title": f"AgriVision Precision Farm Health Report - Farm #{farm_id}",
            "farm_name": farm_data.get("name", "Green Valley Farm"),
            "owner": farm_data.get("owner_name", "Rahul Kumar"),
            "location": f"{farm_data.get('village', 'Bihta')}, {farm_data.get('district', 'Patna')}, {farm_data.get('state', 'Bihar')}",
            "crop": f"{farm_data.get('crop_name', 'Wheat')} ({farm_data.get('crop_variety', 'HD-2967')})",
            "area_acres": farm_data.get("total_area_acres", 12.5),
            "scan_date": "2026-08-18 10:30 AM",
            "health_score": farm_data.get("health_score", 82),
            "disease_detected": farm_data.get("disease_name", "Yellow Rust (Puccinia striiformis)"),
            "confidence_score": "91%",
            "affected_area": "7.4% (approx 0.92 acres)",
            "water_stress_pct": "18% (Mild stress in eastern quadrant)",
            "risk_level": farm_data.get("risk_level", "Medium"),
            "recommendations": [
                "Targeted fungicide application (Propiconazole @ 1ml/L) restricted strictly to affected zone.",
                "Drip irrigation schedule of 2,500 L/acre in eastern section.",
                "Follow-up drone scan recommended in 7 days to verify recovery."
            ]
        }
        return report_data

report_service = ReportService()

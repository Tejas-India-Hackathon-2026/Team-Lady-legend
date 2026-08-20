from typing import Dict, Any

class AssistantService:
    def process_query(self, query: str, language: str = "hi", farm_context: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Multilingual AI Agriculture Assistant for Hindi, Bhojpuri, and English.
        Understands questions about farm health, disease, water stress, weather, and recommendations.
        """
        q_lower = query.lower()
        farm_name = farm_context.get("name", "Green Valley Farm") if farm_context else "आपके खेत"
        health_score = farm_context.get("health_score", 82) if farm_context else 82
        disease_name = farm_context.get("disease_name", "Yellow Rust") if farm_context else "Yellow Rust"
        affected_area = farm_context.get("affected_area_pct", 7.4) if farm_context else 7.4

        # Language-aware response generation
        if language in ["hi", "bhojpuri", "bho"]:
            if "हालत" in query or "health" in q_lower or "कैसा" in query or "कैसन" in query:
                if language == "bho":
                    reply = f"रउआ {farm_name} के सेहत स्कोर {health_score}/100 बा। खेत के 78% हिस्सा एकदम स्वस्थ बा, लेकिन 7.4% क्षेत्र में {disease_name} बीमारी के शुरुआती लक्षण मिलल बा।"
                else:
                    reply = f"आपके {farm_name} का स्वास्थ्य स्कोर {health_score}/100 है। खेत का 78% भाग स्वस्थ है, लेकिन लगभग {affected_area}% क्षेत्र में {disease_name} (पीला रतुआ) का प्रभाव पाया गया है।"
            elif "बीमारी" in query or "disease" in q_lower or "कीड़ा" in query or "रोग" in query:
                if language == "bho":
                    reply = f"खेत में {disease_name} के लक्षण पावल गइल बा। सलाह बा कि प्रभावित 7.4% हिस्सा पर फफूंदनाशक (Fungicide) छिड़काव कइल जाव।"
                else:
                    reply = f"नवीनतम ड्रोन स्कैन में {disease_name} का पता चला है जो कि {affected_area}% क्षेत्र में है। अनुशंसित उपाय: जैविक या प्रोपिकोनाज़ोल छिड़काव करें।"
            elif "पानी" in query or "सिंचाई" in query or "water" in q_lower or "सुखा" in query:
                if language == "bho":
                    reply = "पूर्वी हिस्सा में हल्का जल तनाव (Water Stress - 18%) बा। प्रति एकड़ 2,500 लीटर पानी के सिंचाई करे के जरूरत बा।"
                else:
                    reply = "खेत के पूर्वी कोने में हल्का जल तनाव (18%) देखा गया है। शाम के समय ड्रिप या हल्की सिंचाई करने की सिफारिश की जाती है।"
            else:
                if language == "bho":
                    reply = f"नमस्ते किसान भाई! एग्रीविज़न AI रउआ {farm_name} के निगरानी कर रहल बा। रउआ ड्रोन स्कैन, बीमारी, पानी या मौसम के बारे में पूछ सकत बनीं।"
                else:
                    reply = f"नमस्ते किसान भाई! एग्रीविज़न AI आपके {farm_name} की निगरानी कर रहा है। आप अपने खेत के स्वास्थ्य, बीमारी, सिंचाई या मौसम की सलाह के बारे में पूछ सकते हैं।"
        else:
            # English
            if "health" in q_lower or "score" in q_lower or "how is" in q_lower:
                reply = f"Your farm '{farm_name}' has a overall Health Score of {health_score}/100. 78% of the field is in optimal condition, while {affected_area}% shows signs of {disease_name}."
            elif "disease" in q_lower or "issue" in q_lower or "problem" in q_lower:
                reply = f"AI computer vision detected early-stage {disease_name} on {affected_area}% of your field with 91% confidence. Prompt fungicide application is recommended."
            elif "water" in q_lower or "irrigation" in q_lower:
                reply = "Water stress analysis shows mild moisture deficit (18%) in the eastern quadrant. Supplemental drip irrigation of 2,500 L/acre is recommended."
            else:
                reply = f"Hello! AgriVision AI is actively monitoring '{farm_name}'. Feel free to ask about crop disease, water stress maps, drone scan schedules, or weather advisories."

        suggested_actions = [
            "View Farm Health Map",
            "Book Follow-up Scan",
            "Download PDF Report"
        ]

        return {
            "reply": reply,
            "language": language,
            "suggested_actions": suggested_actions
        }

assistant_service = AssistantService()

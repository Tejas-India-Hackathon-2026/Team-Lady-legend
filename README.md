 # AgriVision — AI-Powered Precision Agriculture Platform

AgriVision is a production-ready, full-stack, multilingual precision-agriculture platform designed for farmers, FPOs, drone operators, agronomists, and agribusiness organizations across India.

## Core Features
- **DETECT → DECIDE → TREAT → MONITOR** workflow
- **Role-Based Workflows**: Farmer, Drone Operator, Agronomist Expert, Admin, FPO Organization
- **Multi-Layer Farm Health Maps**: Interactive Leaflet maps with Healthy (78%), Disease (7.4%), Water Stress (18%), and Treatment layers
- **AI Computer Vision Pipeline**: YOLOv8 crop disease detection, confidence scores, bounding box overlays, and automated risk scoring
- **Multilingual Voice Assistant**: Hindi, Bhojpuri, and English voice interactions powered by Web Speech API (STT & TTS)
- **Drone Booking System**: Pay-per-scan calculation and booking lifecycle management
- **Weather Intelligence**: Agricultural spraying window advisories based on temperature, humidity, rain, and wind speed
- **PDF Report Generator**: Executive farm health reports downloadable in one click
- **Standalone Demo Mode**: Includes pre-populated sample data for Green Valley Farm (Wheat, 12.5 Acres, Patna)

---

## Architecture Overview

```text
agrivision/
├── frontend/               # Next.js 14+ App Router, Tailwind CSS, Recharts, Leaflet
├── backend/                # FastAPI Python REST API, SQLAlchemy models (25 tables), JWT Auth
├── ml/                     # Computer Vision & PyTorch/YOLO inference contracts
├── docker-compose.yml      # Container orchestration
└── README.md
```

---

## Quick Start Guide

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access frontend UI at `http://localhost:3000`.

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python app/main.py
```
Access Swagger API documentation at `http://localhost:8000/docs`.

### Docker Deployment
```bash
docker-compose up --build
```

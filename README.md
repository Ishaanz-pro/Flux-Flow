# 🌊 FluxFlow

FluxFlow is a high-performance, immersive "Narrative Morph" data visualization platform designed for financial intelligence. It solves the cognitive overload of reading dense financial news by combining real-time Natural Language Processing (NLP) with reactive, physics-based user interfaces.

Instead of just showing you a dashboard, FluxFlow acts as an ambient financial radar. The application evaluates headlines and physically morphs its layout and colors to match the market's sentiment.

## ✨ Features

- **Real-Time Sentiment Engine**: Powered by the VADER NLP algorithm on a FastAPI backend. News is scored from `-1.0` (Bearish) to `+1.0` (Bullish).
- **Reactive Mesh Environment**: The application's background smoothly shifts its color gradients based on the current financial sentiment:
  - 📉 **Deep Crimson** for Negative Data
  - ⚖️ **Steel Gray** for Neutral Data
  - 📈 **Emerald Glass** for Positive Data
- **The Narrative Morph**: Fluid layout animations powered by **Framer Motion**. Switch between Card Grids and List Views seamlessly without losing visual context.
- **Cognitive Ergonomics**: Built with "Liquid Glass" UI, glassmorphism layers, and a custom spring-physics liquid cursor to create an engaging experience.
- **Single-Deployment Container**: A multi-stage Dockerfile builds the static React assets and serves them directly through the FastAPI backend, making it trivial to deploy on platforms like Render.

## 🛠 Tech Stack

- **Frontend**: React (Vite), Framer Motion, Tailwind CSS (v3)
- **Backend**: FastAPI, Uvicorn, Pydantic, VADER (`vaderSentiment`)
- **Containerization**: Docker (multi-stage Node + Python 3.11 environment)

## 🚀 Running Locally

You will need **Node.js** and **Python 3.11+** installed on your machine.

### 1. Build the Frontend
The FastAPI server serves the compiled frontend. First, build the React project:
```bash
cd frontend
npm install
npm run build
cd ..
```

### 2. Setup the Backend
Create a virtual environment, install the Python requirements, and start the Uvicorn server:
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt

# Start the application
uvicorn backend.main:app --port 8000
```
Then navigate to `http://localhost:8000` in your browser.

## 🐳 Docker Deployment

The included `Dockerfile` builds both the frontend and the backend for a single-deployment container.
```bash
docker build -t fluxflow .
docker run -p 8000:8000 fluxflow
```

*Designed specifically for developers and analysts looking for an engaging sensory dashboard.*

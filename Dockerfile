# Stage 1: Build the React frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
# Copy package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install
# Copy the rest of the frontend source code and build
COPY frontend/ ./
RUN npm run build

# Stage 2: Build the FastAPI backend and serve everything
FROM python:3.11-slim
WORKDIR /app

# Install backend dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./backend

# Copy the frontend built assets directly into a place where FastAPI expects them 
# (Based on our main.py, it looks in /app/frontend/dist)
COPY --from=frontend-build /app/frontend/dist /app/frontend/dist

# Expose port (Render sets PORT env automatically, typically defaults to 8000 if not)
EXPOSE 8000

# Start Uvicorn, listening on all interfaces
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]

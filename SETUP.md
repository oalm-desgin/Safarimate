# SafariMate Setup Guide

## Quick Start

### Prerequisites
- **Docker & Docker Compose** installed
- **Node.js 18+** and **npm** installed
- **Java 17+** and **Maven** (optional, for local development)

### 1. Clone and Setup

```bash
cd SafariMate
cp .env.example .env
# Edit .env and add your Google Places API key
```

### 2. Start Backend Services (with Docker)

```bash
# Start all backend services
docker-compose up --build

# Or start in detached mode
docker-compose up -d --build
```

This will start:
- **PostgreSQL** on port 5432
- **Redis** on port 6379
- **Auth Service** on port 8085
- **Places Service** on port 8082
- **Prayer Service** on port 8083
- **Planner Service** on port 8084

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at: http://localhost:3000

## Local Development (Without Docker)

### Backend

#### 1. Start PostgreSQL and Redis
```bash
docker-compose up postgres redis
```

#### 2. Start Auth Service
```bash
cd backend/auth-service
./mvnw spring-boot:run
```

#### 3. Start Other Services
```bash
# Places Service
cd backend/places-service
./mvnw spring-boot:run

# Prayer Service
cd backend/prayer-service
./mvnw spring-boot:run

# Planner Service
cd backend/planner-service
./mvnw spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

```bash
# Windows
netstat -ano | findstr :8085
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8085
kill -9 <PID>
```

### Database Connection Issues

1. Make sure PostgreSQL is running
2. Check database credentials in docker-compose.yml or application.yml
3. Try resetting the database:
```bash
docker-compose down -v
docker-compose up postgres redis
```

### Network Errors in Frontend

1. Check that all backend services are running
2. Verify ports in `frontend/vite.config.ts`
3. Check CORS settings in backend services
4. Make sure frontend is using port 3000

### Docker Build Issues

```bash
# Clean Docker cache and rebuild
docker-compose down -v
docker system prune -a
docker-compose up --build
```

## API Endpoints

### Auth Service (Port 8085)
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `GET /auth/test` - Health check

### Places Service (Port 8082)
- `GET /api/places/search` - Search for halal places
- `GET /api/places/nearby` - Get nearby places
- `GET /api/places/details/{placeId}` - Get place details

### Prayer Service (Port 8083)
- `GET /api/prayer/times` - Get prayer times
- `GET /api/prayer/qibla` - Get Qibla direction

### Planner Service (Port 8084)
- `GET /api/trips` - Get user trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/{id}` - Get trip details
- `PUT /api/trips/{id}` - Update trip
- `DELETE /api/trips/{id}` - Delete trip

## Testing

### Test Auth Service
```bash
# Health check
curl http://localhost:8085/auth/test

# Register
curl -X POST http://localhost:8085/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Login
curl -X POST http://localhost:8085/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Default Credentials

Database:
- **Database**: safarimate
- **User**: safarimate_user
- **Password**: safarimate_pass

## Production Deployment

1. Update JWT secret in production
2. Use strong database credentials
3. Set up proper SSL/TLS certificates
4. Configure proper CORS origins
5. Use environment variables for sensitive data
6. Set up proper logging and monitoring

## Need Help?

- Check the logs: `docker-compose logs -f [service-name]`
- Verify environment variables: `docker-compose config`
- Check service health: Visit `/actuator/health` endpoint for each service


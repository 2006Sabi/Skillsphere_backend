# Skillsphere Backend (Express + TypeScript)

This repository contains a ready-to-run backend for the Skillsphere frontend. It provides authentication, user profile, courses, projects, roadmap and a mock compiler endpoint.

## Features
- TypeScript + Express
- MongoDB via Mongoose (use your URI: `mongodb://localhost:27017/skillsphere`)
- JWT-based authentication
- Password hashing with bcrypt
- Validation with express-validator
- Example seed data for courses, projects and roadmap
- Mock compiler endpoint (returns simulated output)

## How to run locally

1. Copy `.env.example` to `.env` and set variables (MONGO_URI, JWT_SECRET).
2. Install dependencies:
```bash
npm install
```
3. Start in dev mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

## API endpoints (summary)

- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login, returns JWT
- `GET /api/users/me` — get profile (auth required)
- `GET /api/courses` — list courses
- `GET /api/projects` — list projects
- `GET /api/roadmap` — list roadmap items
- `POST /api/compiler/run` — mock compile/run code

Feel free to adapt models/controllers to match your frontend fields.

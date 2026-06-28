# Fin-Track

Wealth Management Dashboard

## Live Demo
https://fin-track-05o5.onrender.com/

## Features
- Dashboard with financial overview
- Transaction management
- Reports and analytics
- User authentication (register/login)
- Profile management

## Tech Stack
- Node.js + Express
- Tailwind CSS

## Deployment
Connects automatically to Render via `render.yaml`

## API Endpoints
- `GET /api/budgets` - Get all budgets
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile` - Update profile
- `GET /api/stats` - Get financial statistics

## Local Development
```bash
npm install
npm start
```

Open http://localhost:3000

public URL: https://fin-track-05o5.onrender.com/

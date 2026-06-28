# Fin-Track

Wealth Management Dashboard

## Project Scope

**Fin-Track** (also called BlueLedger) is a wealth management dashboard application for personal finance tracking.

### Architecture
- **Backend**: Node.js + Express server (server.js)
- **Frontend**: Static HTML files with Tailwind CSS (no frontend framework)
- **Deployment**: Render (container hosting via render.yaml)

### Core Features
1. **User Authentication** - Register, login, profile management
2. **Dashboard** - Financial overview with net worth, income/expenses summary
3. **Transactions** - CRUD operations for income/expense records
4. **Budgets** - CRUD operations with spending limits
5. **Reports** - Spending analysis and analytics

### API Endpoints
- `GET/POST/PUT/DELETE /api/budgets` - Budget management
- `GET/POST/PUT/DELETE /api/transactions` - Transaction management
- `GET /api/stats` - Financial statistics (net worth, monthly income/expenses)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `PUT /api/auth/profile` - Profile updates

### Data Model (In-Memory)
- **Users**: id, name, email, password
- **Transactions**: id, date, category, description, amount, status
- **Budgets**: id, name, spent, limit, category

### UI Screens
- Landing page (index.html)
- Login (login.html)
- Register (register.html)
- Dashboard (dashboard.html)
- Transactions (transactions.html)
- Reports (reports.html)
- Profile (profile.html)

### Missing Features (Future Work)
- Persistent database storage
- JWT/session authentication
- Data export/import
- Budget spending sync with transactions
- Unit tests

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

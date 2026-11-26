# Slotly — Appointment Booking System

A full-stack appointment booking platform where **customers** discover local businesses and book time slots, and **businesses** manage their availability and incoming appointments.

Built as a portfolio project with **NestJS**, **Next.js**, **Prisma**, and **PostgreSQL**.

> 🚧 Work in progress. See the [roadmap](#roadmap) for current status.

## Tech Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Backend  | NestJS 11, TypeScript, class-validator, Joi       |
| Database | PostgreSQL, Prisma ORM                            |
| Auth     | bcrypt password hashing, JWT (in progress)        |
| Frontend | Next.js 16 (App Router), React 19, TypeScript     |

## Features

- **Two account types**: customers and businesses, each with its own signup/login flow
- **Secure credentials**: bcrypt-hashed passwords, normalized emails, strong-password validation
- **Business onboarding**: signup creates the business and its weekly availability in a single database transaction
- **Request validation**: DTOs with class-validator; unknown fields are stripped
- **Config validation**: environment variables validated at startup with Joi

## Project Structure

```
appointment-system/
├── src/                  # NestJS API
│   ├── auth/             # signup & login (customer + business)
│   ├── business/         # business module
│   ├── customer/         # customer module
│   ├── prisma/           # PrismaService (DB client)
│   └── common/           # shared helpers
├── prisma/
│   ├── schema.prisma     # data model
│   └── migrations/
└── client/               # Next.js frontend
```

## Data Model

```
Customer 1───* Appointment *───1 Business 1───* Availability
```

- **Customer**: name, email, password
- **Business**: owner, name, category, description, address, rating
- **Availability**: opening/closing time per day of week
- **Appointment**: date, start/end time, status (`PENDING` · `CONFIRMED` · `CANCELLED` · `COMPLETED`)

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 14+

### 1. Backend

```bash
npm install
```

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/slotly"
JWT_SECRET="change-me"
SALT_ROUNDS=12
```

Run migrations and start the API (http://localhost:3000):

```bash
npx prisma migrate dev
npm run start:dev
```

### 2. Frontend

```bash
cd client
npm install
npm run dev    # http://localhost:3001
```

## API Endpoints

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/auth/signup/customer` | Register a customer         |
| POST   | `/auth/signup/business` | Register a business + hours |
| POST   | `/auth/login/customer`  | Customer login              |
| POST   | `/auth/login/business`  | Business login              |

## Roadmap

- [x] Data model & migrations
- [x] Customer & business signup
- [x] Credential verification on login
- [ ] JWT auth with role-based guards
- [ ] Services (duration, price) per business
- [ ] Available-slot calculation & conflict-safe booking
- [ ] Business search & filtering
- [ ] Customer appointments (upcoming / past) & business dashboard
- [ ] Next.js frontend
- [ ] Swagger docs, Docker Compose, tests, deployment

## Scripts

| Command             | Description               |
| ------------------- | ------------------------- |
| `npm run start:dev` | Start API in watch mode   |
| `npm run build`     | Compile the API           |
| `npm run test`      | Run unit tests            |
| `npm run lint`      | Lint and auto-fix         |

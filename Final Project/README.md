# StayBook

StayBook is a vacation rental and booking platform built with Angular, Node.js, Express, and MongoDB.

The project has two user roles:

- **Guest** – browse properties, view property details, make bookings, complete the payment UI, view trips, cancel allowed bookings, and leave reviews for completed stays.
- **Host** – manage properties, view booking requests, approve or decline bookings, and upload property verification documents.

## Project Structure

```text
StayBook/
├── Frontend/
└── Backend/
```

## Technologies

### Frontend
- Angular
- TypeScript
- Angular Signals
- Angular Forms
- Angular Router
- HttpClient
- JWT authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer

## Getting Started

### 1. Backend

Open a terminal inside the `Backend` folder:

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend` folder and add the required environment variables used by the project, including the MongoDB connection string and JWT secret.

Start the backend:

```bash
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### 2. Frontend

Open another terminal inside the `Frontend` folder:

```bash
cd Frontend
npm install
```

Start Angular:

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

## Seed Example Users

The backend includes a `seed.js` file for creating example Guest and Host accounts.

This makes it easy to have test accounts available without creating them manually every time.

From the `Backend` folder, run:

```bash
npm run seed
```

The seed checks whether the email already exists before creating the account, so running the command again does not create duplicate users.

### Example Accounts

**Guest**

```text
Email: guest@staybook.com
Password: Guest12345
Role: guest
```

**Host**

```text
Email: host@staybook.com
Password: Host12345
Role: host
```

After seeding, these accounts can be used to test the Guest and Host flows from the frontend.

## Backend Scripts

Inside the `Backend` folder:

```bash
npm start
```

Starts the backend server.

```bash
npm run seed
```

Creates the example Guest and Host users.

## Main Guest Flow

```text
Home
  ↓
Property Details
  ↓
Booking
  ↓
Payment
  ↓
Confirmation
  ↓
My Trips
  ↓
Trip Details
  ↓
Review
```

## Main Host Flow

```text
Host Dashboard
  ↓
My Properties
  ├── Add Property
  ├── Edit Property
  └── Delete Property

Host Bookings
  ├── Approve
  └── Decline

Verification
  └── Upload Documents
```

## Authentication

Users sign in using their email and password.

The user's role is stored in the JWT returned by the backend and is used by the frontend to determine whether the user follows the Guest or Host flow.

There is no Admin role in this version of StayBook.


## API Base URL

```text
http://localhost:5000/api/v1
```

## Project Purpose

StayBook was created as a full-stack web application for managing short-term vacation rentals and bookings, connecting guests looking for accommodation with hosts managing their properties.

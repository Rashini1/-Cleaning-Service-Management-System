# Cleaning Service Management System

A full-stack web application for managing cleaning service bookings. Built with React on the frontend and Express.js with MongoDB on the backend.

## Features

- 📋 **Browse Services**: View 8+ professional cleaning services with detailed descriptions and pricing
- 🗓️ **Book Services**: Schedule cleaning appointments with customer information and preferred time slots
- 👨‍💼 **Admin Dashboard**: Manage bookings, track status, and respond to customer requests
- 📱 **Responsive Design**: Fully responsive UI with modern styling using Tailwind CSS
- 🔐 **Admin Access**: Secure admin panel with password protection
- 💾 **Persistent Storage**: Bookings stored locally and synced with backend database
- 📊 **Booking Management**: View, update, and delete bookings with status tracking

## Tech Stack

### Frontend
- React 19
- Vite (build tool)
- Tailwind CSS (styling)
- Axios (HTTP client)
- ESLint (code quality)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- CORS enabled
- dotenv (environment configuration)
- Nodemon (development)

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Cleaningservice.jsx  (main component)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   │   └── serviceController.js
│   ├── models/
│   │   └── Service.js
│   ├── routes/
│   │   └── services.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## Installation

### 1. Clone or extract the project

```bash
cd "Assignment_Cleaning Service Management"
cd "-Cleaning-Service-Management-System"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/cleaning-service
PORT=5000
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (optional):

```env
VITE_API_BASE_URL=http://localhost:5000
```

## Running the Application

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Server

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Services API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Get all cleaning services |
| POST | `/api/services` | Create a new service |
| PUT | `/api/services/:id` | Update a service |
| DELETE | `/api/services/:id` | Delete a service |

## Features in Detail

### Home Page
- Hero section with service highlights
- Testimonials from satisfied customers
- Gallery showcasing completed work

### Services Page
- Filter services by category (Residential, Commercial, Specialized, Express)
- View detailed service descriptions, pricing, and duration
- Quick booking functionality

### Booking System
- Fill customer details (name, email, phone)
- Select service and preferred date/time
- Add special instructions
- Booking confirmation with reference number

### Admin Dashboard
- Login with password protection
- View all bookings with statistics
- Filter bookings by status (Pending, Confirmed, In Progress, Completed, Cancelled)
- Update booking status
- Delete bookings

## Service Categories

1. **Deep Clean** - LKR 149 starting from
2. **Standard Home Clean** - LKR 79 per visit
3. **Office Cleaning** - LKR 199 starting from
4. **Sofa & Upholstery** - LKR 89 starting from
5. **Move-In / Move-Out** - LKR 189 starting from
6. **Post-Construction** - LKR 249 starting from
7. **Carpet Steam Clean** - LKR 69 per room
8. **Express Tidy** - LKR 49 per visit

## Admin Credentials

- Username: `admin123` (password for admin panel)

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

### Frontend (.env)
- `VITE_API_BASE_URL`: Backend API base URL (default: http://localhost:5000)

## Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start with nodemon (auto-reload on changes)

## Notes

- Bookings are stored in browser localStorage initially
- Connect to backend MongoDB for persistent storage
- CORS is enabled to allow frontend-backend communication
- Use WhatsApp integration for customer inquiries (default number: +94712345678)

## Future Enhancements

- Payment integration
- Email notifications
- SMS confirmations
- Customer dashboard
- Service provider management
- Real-time availability calendar
- Rating and review system

 
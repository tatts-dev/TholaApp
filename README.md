<p align="center">
  <img width="575" height="442" alt="Screenshot 2026-05-15 141345" src="https://github.com/user-attachments/assets/ffcd1eec-d49a-429a-8ea5-79447dcd8759" />
</p>

# Thola Marketplace App (V1)

Thola is a mobile-first, full-stack township commerce platform designed to connect users with local vendors. It features robust role-based authentication, a map interface for discovering local vendors, product catalog management, and seamless integration for vendor KYC.

## Tech Stack

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **UI & Styling**: React Native Paper
- **State Management**: Zustand
- **Forms & Validation**: React Hook Form
- **Maps**: React Native Maps

### Backend 
- **Server**: Node.js with Express.js
- **Database ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens) & bcrypt
- **File Handling**: Multer
- **Validation**: express-validator

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- PostgreSQL on Supabase (Configured database for Prisma)
- Expo Go app on your physical device (or an iOS/Android emulator)

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Set up your `.env` file based on `.env.example` (Database URL, JWT Secret, etc.)
4. Run Prisma migrations: `npx prisma db push` (or `npx prisma migrate dev`)
5. Start the development server: `npm run dev`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Set up your `.env` file with your API URL.
4. Start the Expo development server: `npm start`
5. Scan the QR code with the Expo Go app on your phone, or press `i` / `a` to open in an emulator.

## Versioning
This repository is marked as **V1**. You can return to this clean state at any time by checking out the `v1.0.0` tag in Git.

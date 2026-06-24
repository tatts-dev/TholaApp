<p align="center">
  <img width="575" height="442" alt="Screenshot 2026-05-15 141345" src="https://github.com/user-attachments/assets/ffcd1eec-d49a-429a-8ea5-79447dcd8759" />
</p>

# Thola App (V1)

Developed at the ITWEB Security Summit hackathon 2026 in Johannesburg hosted by Geekluch.
Thola is a mobile-first platform designed to connect users with local vendors. It features robust role-based authentication, a map interface for discovering local vendors, product catalog management, and seamless integration for vendor KYC.

## The stack we used to developed Thola.

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **UI & Styling**: React Native Paper
- **State Management**: Zustand
- **Forms & Validation**: React Hook Form
- **Maps**: Mapbox GL

### Backend 
- **Server**: Node.js with Express.js
- **Database ORM**: Prisma

## How to get started?

### Prerequisites
- Node.js 
- PostgreSQL on Supabase 
- Expo Go app on your physical device 

### Server Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Set up your `.env` file based on `.env.example` 
4. Run Prisma migrations: `npx prisma db push` 
5. Start the development server: `npm run dev`

### Mobile (React-Native) Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Set up your `.env` file
4. Start the Expo development server: `npm start`
5. Scan the QR code with the Expo Go app on your phone, or press `i` / `a` to open in an emulator.

Feature & Presented at the ITWEB Security Summit hackathon 2026 

Developed by Thato Mashifana | Blessing Maleka | Kevin Nkadimeng | Thabiso Mashifana.

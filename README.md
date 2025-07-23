# 🎬 Film Fanatics Frontend

A React + Vite web app for joining, exploring, and managing TV & Movie discussion clubs. Based on a professional Figma design.

## 🚀 Features
- User authentication (Register, Login)
- Join/Create/Edit/Delete clubs
- Explore trending shows, feeds, and user profiles
- Comment, like, and share reviews
- Fully responsive UI (based on Figma)

## 🔧 Technologies
- React
- Redux Toolkit
- React Router
- Axios
- Vite
- Optional: Tailwind CSS

## 🛠️ Installation

```bash
npm install
npm run dev

film-fanatics-frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── Clubs/
│   │   │   ├── ClubCard.jsx
│   │   │   ├── ClubDetails.jsx
│   │   │   ├── ClubList.jsx
│   │   │   └── CreateClub.jsx
│   │   ├── Explore/
│   │   │   └── Explore.jsx
│   │   ├── Feed/
│   │   │   └── Feed.jsx
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx
│   │   │   
│   │   │   └── Landing.jsx  
│   │   └── Profile/
│   │       └── Profile.jsx
│   ├── store/
│   │   ├── authSlice.js
│   │   ├── clubSlice.js
│   │   ├── commentSlice.js
│   │   ├── postSlice.js
│   │   └── index.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── vite.config.js
├── README.md
├── .gitignore



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

mkdir -p src/components/{Auth,Clubs,Explore,Feed,Layout,Profile}
mkdir src/assets
touch README.md .gitignoremd and .gitignore if not presentex.js vite.config.js
touch src/components/Layout/Landing.jsx
touch src/components/Auth/ProtectedRoute.jsx
touch src/components/Auth/ProtectedRoute.jsx
touch src/store/{authSlice.js,clubSlice.js,commentSlice.js,index.js,postSlice.js}

{
  "name": "film-fanatics-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@reduxjs/toolkit": "^2.8.2",
    "axios": "^1.10.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.2.0",
    "react-router-dom": "^7.7.0",
    "redux": "^5.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.7.0",
    "eslint": "^9.31.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-react": "^7.37.5",
    "prettier": "^3.6.2",
    "vite": "^5.2.0"
  }
}

# 🎬 Film Fanatics Frontend

A React + Vite web app for joining, exploring, and managing TV & Movie discussion clubs. Based on a professional Figma design.

## 🚀 Features
- User authentication (Register, Login)
- Join/Create/Edit/Delete clubs
- Explore trending shows, feeds, and user profiles
- Comment, like, and share reviews
- Fully responsive UI 

## 🔧 Technologies
- React
- Redux Toolkit
- React Router
- Axios
- Vite

## 🛠️ Getting Started

### 1. 📦 Clone the repo
```bash
git clone https://github.com/jxn-24/film-fanatics-frontend.git
cd film-fanatics-frontend
```

## 🛠️ Installation

```bash
npm install react-router-dom redux @reduxjs/toolkit axios
npm install -D prettier eslint eslint-plugin-react eslint-config-prettier
npm install 
npm run dev (in one terminal)
json-server --watch db.json --port 3001 (in another terminal)
```

## Folder Structure
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


## 🔐 Protected Routes
Feed, Clubs, CreateClub, Profile, Explore → are only visible when user is logged in

Used ProtectedRoute.jsx component for route guarding


## 🧾 License

Copyright <2025> <jxn-24>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
# 📝 BlogHub – A Simple Blogging Platform

BlogHub is a full-stack MERN application where users can register, log in, create blog posts, view all blogs, and manage their own posts. Built as part of an interview task by SINOPE.

---

## 🔗 Live Links

-  **Frontend (React + Vite on Vercel)**: [https://blog-hub-upz6.vercel.app/](https://blog-hub-upz6.vercel.app/)
-  **Backend API (Node + Express on Render)**: [https://blog-hub-opvw.onrender.com](https://blog-hub-opvw.onrender.com)

---

## 🚀 Tech Stack

- **Frontend**: React.js (Vite, Hooks)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JWT (Token-based Auth)
- **Deployment**: Vercel (Client) & Render (Server)

---

## 📁 Project Structure
BlogHub/
├── Client/ # React frontend (Vite)
│ ├── src/
│ ├── public/
├── Server/ # Node.js backend (Express)
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── .env # Contains MONGODB_URI, JWT_SECRET, etc.(Which I include in the Git Repo)

---

## ⚙️ Setup Instructions (Local Development)

###  1. Clone the Repository (In Terminal)
-> git clone https://github.com/Bazee5/Blog_Hub.git
-> cd bloghub

###  2. Setup Server (Backend)
-> I didn't ignore the.env file; it will also be there when cloning the repository.
-> If .env is not available then proceed with below
-> Create a .env file inside /Server: 
 
 PORT=5000
 MONGODB_URI=your_mongodb_connection_string
 JWT_SECRET=your_jwt_secret

-> Then Start the server by "node index.js"

###  3. Setup Client (Frontend)
-> cd Client
-> npm install
-> Then Start the Frontend by "npm run dev"


📡 API Documentation (Brief)
🔐 Auth Routes
POST /api/auth/register – Register a new user
POST /api/auth/login – Login user and return JWT token

📝 Blog Routes (Protected)
GET /api/blogs – Get all blogs
POST /api/blogs – Create a blog (Requires JWT)
GET /api/blogs/:id – Get a specific blog
PUT /api/blogs/:id – Update your blog
DELETE /api/blogs/:id – Delete your blog










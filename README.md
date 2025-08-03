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

---
ScreenShots
<img width="173" height="165" alt="Screenshot 2025-08-02 192412" src="https://github.com/user-attachments/assets/9e9e0964-382f-4de3-b3b0-24d796d9559b" />
<img width="1787" height="897" alt="Screenshot 2025-08-03 061354" src="https://github.com/user-attachments/assets/d325093b-d7ca-429f-8481-1020de933f38" />
<img width="1769" height="909" alt="Screenshot 2025-08-03 061414" src="https://github.com/user-attachments/assets/088c4e26-172f-4c1f-a121-ae031599a81d" />

---

Author
Bazee K
MERN Stack Developer 
My Linkedin - https://www.linkedin.com/in/bazee-k/
Contact -9515492665

App Live At https://blog-hub-upz6-deb9z0lxc-bazees-projects.vercel.app/








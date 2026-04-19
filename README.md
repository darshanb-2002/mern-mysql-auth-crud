# MERN Authentication & Item Management System

## 📌 Project Description

This is a full-stack web application built using:

* **Frontend:** React.js + Tailwind CSS
* **Backend:** Node.js + Express.js
* **Database:** MySQL

The application allows users to:

* Register and login securely
* Reset password using token-based system
* Manage items (Add, Edit, Delete)
* View dashboard with item statistics

---

## 🗄️ MySQL Database Setup

### Step 1: Open phpMyAdmin (XAMPP)

### Step 2: Run the following SQL:

```sql
CREATE DATABASE IF NOT EXISTS mern_auth_db;
USE mern_auth_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  reset_token VARCHAR(255),
  reset_token_expiry DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('active','pending','completed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## ⚙️ Backend Setup

### Step 1:

```bash
cd backend
npm install
```

### Step 2: Create `.env` file

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=mern_auth_db
JWT_SECRET=secret123
```

### Step 3: Run backend

```bash
node server.js
```

Server runs at:
👉 http://localhost:5000

---

## 🎨 Frontend Setup

### Step 1:

```bash
cd frontend
npm install
```

### Step 2: Run frontend

```bash
npm run dev
```

Frontend runs at:
👉 http://localhost:5173

---

## ▶️ How to Run Project

1. Start XAMPP (Apache + MySQL)
2. Run backend:

   ```bash
   cd backend
   node server.js
   ```
3. Run frontend:

   ```bash
   cd frontend
   npm run dev
   ```
4. Open browser:
   👉 http://localhost:5173

---

## 🔗 API Endpoints

### 🔐 Auth APIs

| Method | Endpoint                  | Description          |
| ------ | ------------------------- | -------------------- |
| POST   | /api/auth/register        | Register user        |
| POST   | /api/auth/login           | Login user           |
| POST   | /api/auth/forgot-password | Generate reset token |
| POST   | /api/auth/reset-password  | Reset password       |

---

### 📦 Item APIs

| Method | Endpoint         | Description    |
| ------ | ---------------- | -------------- |
| GET    | /api/items       | Get all items  |
| GET    | /api/items/stats | Get statistics |
| POST   | /api/items       | Add item       |
| PUT    | /api/items/:id   | Update item    |
| DELETE | /api/items/:id   | Delete item    |

---

## 🧠 Features

* JWT Authentication
* Protected Routes
* Forgot/Reset Password
* CRUD Operations
* Dashboard with stats
* Responsive UI (Tailwind CSS)
* Loading, Error & Success states

---

## 📸 Screenshots (Add your images here)

* Login Page
* Register Page
* Dashboard
* Add Item
* Edit Item
* Delete Confirmation
* Database Tables (phpMyAdmin)

---

## 📁 Project Structure

### Backend

```
backend/
├── config/db.js
├── controllers/
├── routes/
├── middleware/
├── server.js
├── .env
```

### Frontend

```
frontend/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
```

---

## 🚀 GitHub

* Push project to GitHub
* Make repository PUBLIC
* Add `.gitignore`
* Share repository link

---

## 👨‍💻 Author

Darshan B

---

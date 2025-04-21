# 🧭 Lost and Found Application

Welcome to the **Lost and Found App** — a simple platform where users can report lost items or submit found items to help reconnect lost belongings with their rightful owners.

This project is built with **Angular** (frontend), **Node.js** (backend), and **MySQL** (database).

---

## 🚀 Features

- 🔍 Browse all reported lost and found items
- 📝 Report a new lost item
- 📦 Report a found item
- 🖼️ Upload images for items
- 🗂️ Filter items by location, category, and date
- 🧹 Clean and responsive UI using Angular Material
- 🔐 Backend API secured with environment variables
- 📈 Dashboard showing counts of lost/found items and recent reports

---

## 🛠️ Tech Stack

- **Frontend**: Angular 16 + Angular Material
- **Backend**: Node using TypeScript (Express)
- **Database**: MySQL
- **Other Tools**: 
  - dotenv (for managing environment variables)
  - multer (for handling image uploads)

---

## 📂 Project Structure

```plaintext
lost-and-found-application/
├── lost-and-found-frontend/   # Angular frontend
├── lost-and-found-backend/    # Node.js backend
├── database/                  # Database queries
└── README.md                  # This file


Run the frontend using:
ng serve -o

Backend:
npx tsx src/index.ts

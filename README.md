# 🌍 BookIt: Experiences & Slot Booking Platform

A full-stack web application built as part of the **Fullstack Intern Assignment** to allow users to explore, book, and confirm adventure experiences.

---

## 🚀 Tech Stack

**Frontend**
- React + TypeScript (Vite)
- TailwindCSS for styling
- React Router for page navigation
- Firebase Firestore for real-time data
- Lucide Icons for UI icons

**Backend**
- Firebase Firestore (used as NoSQL backend and API alternative)
- Node.js seeding script with Firebase Admin SDK

## 🧩 Backend Architecture 
Instead of a custom Express or NestJS API, this project uses **Firebase Firestore** as a managed NoSQL backend.  
Firestore serves as both the **database** and **API layer**, providing direct CRUD access from the frontend through Firebase SDKs.  
This approach preserves all assignment requirements (data storage, slot management, promo code logic) while simplifying hosting and improving scalability.

Key Advantages:
- Real-time data synchronization
- No need for manual REST endpoints
- Seamless integration with frontend
- Secure, scalable, and production-ready

---

## 🧩 Features

### 🔹 Core Functionality
- Browse experiences on Home Page
- View detailed experience info and available slots
- Select date/time, quantity, and book slots
- Apply promo codes (`SAVE10`, `FLAT100`, `ADVENTURE15`)
- Confirm booking with dynamic reference ID
- Responsive design with clean UI

### 🔹 Dynamic Data
- Experiences, prices, and slots fetched from **Firestore**
- Dates are **auto-generated dynamically** in the future
- Real-time updates possible using Firestore listeners

### 🔹 UX/UI
- Fully responsive (mobile, tablet, desktop)
- Loading and sold-out states
- Validations for user input (email, name, terms)

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/snehanshastri/bookit.git
cd bookit

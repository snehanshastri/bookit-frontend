# 🌍 Bookit – Adventure Experience Booking Platform

Bookit is a responsive web application that allows users to explore, view, and book curated adventure experiences across India — from kayaking in Udupi to paragliding in Bir Billing.  
It features real-time slot availability, secure Firestore integration, and a clean, modern UI.

---

## 🚀 Features

✅ **Dynamic Experiences** — List of curated adventure activities with live availability  
✅ **Real-time Firestore Sync** — Slot capacities and experience details update instantly  
✅ **Search & Filtering** — Easily find experiences by name or location  
✅ **Responsive Design** — Fully functional on mobile, tablet, and desktop  
✅ **Promotional Codes** — Apply flat or percentage discounts  
✅ **Deployed on Vercel** — Seamless CI/CD from GitHub

---

## 🛠️ Tech Stack

| Category | Technology Used |
|-----------|-----------------|
| Frontend | React + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | Firebase Firestore |
| Hosting | Vercel |
| Icons | Lucide React |
| Build Tool | Vite |
| Version Control | Git + GitHub |

---

## 📦 Folder Structure

```

bookit-frontend/
│
├── public/                # Static assets (images, icons)
├── src/
│   ├── api/               # Firestore interaction logic
│   ├── assets/            # Image assets
│   ├── components/        # Reusable UI components
│   ├── lib/               # Firebase config
│   ├── pages/             # Main app pages (Home, Details)
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md

````

---

## 🧑‍💻 Setup & Local Development

### 1️⃣ Clone the repository

```bash
git clone https://github.com/snehanshastri/bookit-frontend.git
cd bookit-frontend
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the development server

```bash
npm run dev
```

Then open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4️⃣ Build for production

```bash
npm run build
```

---

## 🔥 Firebase Setup

Bookit uses **Firebase Firestore** for storing experience data and slot availability.

### Configuration

Create a file at `src/lib/firebase.ts` with the following (your config is already added):

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

---

## 🪙 Promo Codes for Testing

The following promo codes can be applied during booking to verify discount logic:

| Promo Code | Type      | Value | Description                  |
|-------------|-----------|--------|------------------------------|
| **SAVE10**  | Percent   | 10%    | Get 10% off total booking    |
| **FLAT100** | Flat      | ₹100   | Save ₹100 on any experience  |
| **ADVENTURE15** | Percent | 15% | 15% discount on adventure packages |

> ⚠️ These codes are available only for testing and demonstration purposes.
> They are stored in the Firestore `promos` collection seeded during setup.


## 🌐 Deployment

This project is **hosted on Vercel** with automatic deployments from the main branch.

🔗 **Live Demo:** [https://bookit-frontend-sandy.vercel.app/](https://bookit-frontend-sandy.vercel.app/)

---

## 🧾 Assignment Alignment

| Requirement           | Implementation                                                      |
| --------------------- | ------------------------------------------------------------------- |
| Custom API or backend | Firestore used as custom data source with structured seeding script |
| Responsive frontend   | Tailwind CSS with fully responsive grid layouts                     |
| Data persistence      | Firestore collections (`experiences`, `promos`, `slots`)            |
| Deployment            | Vercel auto-deployment from GitHub                                  |
| Technology stack      | React, TypeScript, Firebase, Tailwind                               |
| Bonus features        | Real-time updates, promo codes, detailed cards                      |

---

## 📸 Screenshots

![Home Page](image.png)
![Experience Card](image-1.png)
![Booking](image-2.png)
![Payment](image-3.png)
![Confirmation](image-4.png)
---

## 🧠 Author

👩‍💻 **Sneha N Shastri**
📍 India
🌐 [GitHub: @snehanshastri](https://github.com/snehanshastri)

---

## 💬 Acknowledgements

* Firebase Documentation
* Vercel Hosting Platform
* Tailwind CSS & shadcn/ui
* Lucide React Icons
* React Router DOM

---

## 🏁 License

This project is developed for the internship shortlist submission of Highway Delite and used for professional purpose only

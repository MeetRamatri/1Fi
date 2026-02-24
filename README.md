# 1Fi Full Stack Developer Assignment

A full-stack ecommerce-style web application that displays smartphones with multiple EMI plans backed by mutual funds. The application retrieves product and EMI data dynamically from a backend API and presents it in a responsive React frontend.

---

## 🚀 Tech Stack

**Frontend**
* React (Vite)

**Backend**
* Node.js
* Express.js

**Database**
*  MongoDB 

**Deployment**
* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure
```
1fi-assignment/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
└── README.md
```
---

## 📌 Features (Planned)

* **Product Catalog:** Display a minimum of 3 premium smartphones.
* **Detailed View:** Name, Slug, Description, MRP, Base Price, and Brand.
* **Variants:** 2+ Variants (color/storage) per product.
* **EMI Integration:** 2+ EMI Plans with interest rate and cashback logic.
* **Dynamic Routing:** SEO-friendly URLs via `/products/:slug`.
* **Responsive UI:** Fully optimized for all screen sizes.

---

## 🗄 Database Design



### Product Table
* id (PK)
* name
* slug (UNIQUE)
* description
* mrp
* base_price
* brand

### Variant Table
* id (PK)   
* product_id (FK)
* color
* storage
* ram
* variant_price
* image_url

### EMI Table
* id (PK)
* product_id (FK)
* monthly_amount
* tenure_month
* interest_rate
* cashback_amount

---

## 🔌 API Endpoints

* **GET** `/api/products` - List all products
* **GET** `/api/products/:slug` - Get specific product details

---

## 🛠 Setup Instructions

### 1. Clone Repository
``` bash
git clone https://github.com/MeetRamatri/1Fi.git 
cd 1fi
```

### 2. Backend Setup
``` bash
cd backend
npm install
npm run dev
```
(Runs on http://localhost:5000)

### 3. Frontend Setup
``` bash
cd frontend
npm install
npm run dev
```
(Runs on http://localhost:5173)

---

## 🎯 Development Plan

1. **Phase 1:** Setup backend, Connect database, Seed data.
2. **Phase 2:** Create and test API endpoints via Postman.
3. **Phase 3:** Setup frontend, Implement routing, Fetch products.
4. **Phase 4:** EMI selection logic & Tailwind styling.
5. **Phase 5:** Deployment & Demo video.

---

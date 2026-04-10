# 🛒 BuyMe – Full Stack E-Commerce Platform

BuyMe is a modern, full-featured **E-Commerce web application** built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It provides a seamless shopping experience for users and a powerful admin panel for managing products, orders, and analytics.

---

## 🚀 Live Demo

- 🌐 Web App: https://ecommerce-buy-me.onrender.com  
- 🛠 Admin Panel: https://buy-me-admin.onrender.com  

---

## 📁 Project Structure

```
BuyMe/
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── admin-panel/
│   ├── src/
│   ├── pages/
│   └── components/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
├── .github/workflows/
├── package.json
└── README.md
```

---

## ⚙️ Core Features

### 🛍 User Features
- Browse products by category (Men, Women, Kids)
- View product details with pricing and availability
- Add items to cart and checkout
- Multiple address support
- JWT-based authentication
- Dark / Light mode toggle
- Invoice generation using `window.print()`

---

### 🛠 Admin Features
- Add, update, and delete products
- Manage stock availability
- View all orders
- Update order status
- Dashboard showing:
  - Total Products
  - Total Orders
  - Total Revenue
  - Pending Orders

---

### 💳 Payment Integration
- Cash on Delivery (COD)
- Stripe Payment Gateway
- Razorpay (UPI / QR support)

---

### 📦 Inventory Management
- Real-time stock updates
- Automatic stock decrement on order
- "Out of Stock" notifications

---

## 🔄 Workflow

### 1️⃣ User Flow
1. User registers or logs in  
2. Browses products  
3. Adds items to cart  
4. Selects address and payment method  
5. Places order  
6. Generates invoice  

---

### 2️⃣ Admin Flow
1. Admin logs in  
2. Adds or updates products  
3. Monitors orders  
4. Updates delivery status  
5. Tracks revenue via dashboard  

---

### 3️⃣ Backend Flow
- Handles authentication and authorization  
- Stores data in MongoDB  
- Validates requests via middleware  
- Uses controllers for business logic  

---

## 🔐 Authentication & Security
- JWT-based authentication  
- Input validation to prevent fake data  
- Protected admin routes  
- Secure API endpoints  

---

## ⚡ CI/CD Pipeline
- Push code to GitHub  
- GitHub Actions runs build  
- Automatic deployment on Render  

---

## 🛠 Technologies Used

### Frontend
- React.js  
- Tailwind CSS  
- Axios  
- Context API  

### Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

### Payment
- Stripe API  
- Razorpay API  

### Tools & Deployment
- Git & GitHub  
- Render  
- Postman  

---

## 💻 Installation & Setup

### 1. Clone Repository
```
git clone https://github.com/your-username/BuyMe.git
cd BuyMe
```

---

### 2. Backend Setup
```
cd backend
npm install
npm run dev
```

---

### 3. Frontend Setup
```
cd frontend
npm install
npm run dev
```

---

### 4. Admin Panel Setup
```
cd admin-panel
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
STRIPE_SECRET=your_stripe_key
RAZORPAY_KEY=your_key
RAZORPAY_SECRET=your_secret
```

---

## 🔮 Future Enhancements
- Mobile application (React Native)  
- AI-based product recommendations  
- Advanced analytics dashboard  
- Real-time notifications  
- Multi-language support  
- Order tracking system  

---

## 👨‍💻 Developer

**Kavaiya Varun**

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and submit a pull request.

---

## ⭐ Support

If you like this project, give it a **star ⭐ on GitHub**!

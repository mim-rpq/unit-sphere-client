# Unit Sphere 

Unit Sphere is a modern, responsive React web application built with Vite, Tailwind CSS, Firebase, and Stripe.

# Building Management System (BMS)

A modern, full-stack web application for managing a single building's apartments, users, and operations — built with the **MERN stack**, Firebase, and Stripe.

---

## Live Demo

Check out the live version here: [Live Demo]( https://ph-assignments-5c5c6.web.app)

##  Features

- **Authentication & Role-based Access**
  - Login and register with Firebase Authentication
  - Admin, Member, and Regular User roles
  - Protected routes and dashboards

-  **Apartment Management**
  - View all available rooms
  - Apply for an apartment with a request-based agreement system
  - Admin can view and approve/reject agreements
  - Dynamic apartment availability status

-  **Secure Payment System**
  - Stripe integration
  - Apply coupon codes for discounts
  - Backend coupon validation to prevent abuse

- **User Management**
  - Admin can manage all users and promote them to members
  - Members have extra privileges over regular users

-  **Announcements & Notices**
  - Admin can post building-wide announcements

-  **Admin Dashboard**
  - Profile view with:
    - Name, Email, Profile Picture
    - Total rooms and percentages of availability
    - Total users and members count
  - Full apartment and user management in one place

---

##  Tech Stack

- **Frontend**: React, Tailwind CSS, React Router, React Query, Axios
- **Authentication**: Firebase Auth + Firebase Admin SDK (backend)
- **Backend**: Node.js, Express.js, MongoDB
- **Payment**: Stripe API
- **Deployment**: Vercel (Client) & Render (Server)

---

##  Environment Variables

Make sure to set these in `.env` for both client and server:

###  Client:
```
VITE_API_BASE_URL=
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
```

###  Server:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_key
FIREBASE_SERVICE_ACCOUNT=your_service_account_credentials
JWT_SECRET=your_jwt_secret
```

## 🌐 Live Site

🔗 [Visit Live Website]( https://ph-assignments-5c5c6.web.app)

---

---




<div align="center">

  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7ee69a103362143.5f4b5003fb7cb.gif" alt="Bakery Animation Banner" width="100%" />

  <br />
  <br />

  <h1>🍰 BakingShop - Premium E-Commerce Platform</h1>
  
  <p>
    <b>A modern, fully-functional, and highly interactive MERN stack e-commerce web application crafted for artisanal bakeries. Designed with seamless user experience, stunning animations, and robust backend architecture.</b>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node JS" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  </p>

  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#%EF%B8%8F-technology-stack">Tech Stack</a> •
    <a href="#-installation--setup">Installation</a> •
    <a href="#-project-structure">Architecture</a>
  </p>

</div>

---

## ✨ Key Features

### 🛍️ Intelligent Shopping Experience
- **Guest Cart System:** Browse and add items to the cart effortlessly without mandatory login. Data is securely persisted locally.
- **Dynamic Search:** Seamless search engine integrated into the navigation bar that dynamically filters global products instantly.
- **Product Reviews & Ratings:** Real-time customer reviews and interactive 5-star rating system on individual product pages.

### 🎨 Premium Interactive UI
- **Smooth Animations:** Built with `framer-motion` for buttery-smooth page transitions, scrolling experiences, and floating 3D glassmorphism cards.
- **Floating Toast Notifications:** Elegant, non-intrusive animated toast popups completely replace generic browser alerts across the app.
- **Responsive Design:** Flawless experience across desktop, tablet, and mobile devices.

### 🔐 Security & Authentication
- **Secure Gateway:** Robust JSON Web Token (JWT) based authentication system.
- **Checkout Protection:** Checkout routes are strictly protected, seamlessly routing unauthenticated users to a beautiful login interface.
- **Advanced Validation:** Real-time form validations with strict Regex constraints (e.g., proper email schemas, strict 10-digit phone numbers).

### 💳 Advanced Order & Checkout Flow
- **Amazon-style Checkout:** Dual-column layout with conditional "Billing Address" form toggles based on user selection.
- **Multiple Payment Options:** Support for standard UPI/Online Payments and Cash on Delivery (COD).
- **📄 Automatic PDF Invoicing:** Upon successful checkout, the system intelligently generates a beautifully formatted PDF Bill containing the exact order schema, prices, and a unique Order ID, available for immediate download.

---

## 🛠️ Technology Stack

| Domain | Technologies Used |
| :--- | :--- |
| **Frontend Architecture** | React (Vite), React Router v6, Context API |
| **Styling & UI Components** | Vanilla CSS (Custom Design System), Framer Motion, Lucide React (Icons) |
| **Backend API** | Node.js, Express.js, RESTful Architecture |
| **Database Ecosystem** | MongoDB, Mongoose ODM |
| **Security & Auth** | JSON Web Tokens (JWT), Bcrypt.js, CORS |
| **Utilities** | Axios (API Requests), jsPDF & jspdf-autotable (Invoice Generation) |

---

## 🚀 Installation & Setup

Want to run this project locally? Follow these simple steps.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/en/) (v16+) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/your-username/bakingshop-ecommerce.git
cd bakingshop-ecommerce
```

### 2. Environment Variables Setup
You will need to create two `.env` files.

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_signature_key
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Install & Start Server (Backend)
Open a terminal and run:
```bash
cd server
npm install
npm run dev
```
*The backend should default to `http://localhost:5000`*

### 4. Install & Start Client (Frontend)
Open a second terminal and run:
```bash
cd client
npm install
npm run dev
```
*The frontend should default to `http://localhost:5173`*

---

## 📂 Project Structure

A quick look at the core structure of the repository:

```text
📦 bakingshop-ecommerce
 ┣ 📂 client                  # React Frontend Environment
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components          # Reusable UI parts (Navbar, Footer, ProductCard, etc.)
 ┃ ┃ ┣ 📂 context             # Global State Management (CartContext, AuthContext)
 ┃ ┃ ┣ 📂 pages               # Main Views (Home, Checkout, OrderSuccess, etc.)
 ┃ ┃ ┣ 📜 App.jsx             # Main Router configuration
 ┃ ┃ ┗ 📜 index.css           # Custom Design System & Variables
 ┃ ┗ 📜 package.json
 ┣ 📂 server                  # Node.js/Express Backend Environment
 ┃ ┣ 📂 config                # Database connection logic
 ┃ ┣ 📂 controllers           # Request handlers and business logic
 ┃ ┣ 📂 models                # MongoDB Schemas (User, Product, Order)
 ┃ ┣ 📂 routes                # Express API Route definitions
 ┃ ┣ 📜 server.js             # API Entry Point
 ┃ ┗ 📜 package.json
 ┗ 📜 README.md
```

---

## 📸 Application Gallery

<div align="center">
  <table width="100%">
    <tr>
      <td width="50%" align="center"><b>Modern Authentication UI</b></td>
      <td width="50%" align="center"><b>Dynamic PDF Bill Generation</b></td>
    </tr>
    <tr>
      <td>
        <!-- Add your image link here -->
        <img src="https://i.ibb.co/6P0xH26/auth.gif" alt="Authentication Interface" width="100%" />
      </td>
      <td>
        <!-- Add your image link here -->
        <img src="https://i.ibb.co/1qS8yX3/checkout.gif" alt="Order Success Invoice" width="100%" />
      </td>
    </tr>
  </table>
  <br/>
  <i>*Replace the placeholder image links above with actual screenshots of your final application before publishing!*</i>
</div>

---

<div align="center">
  <br/>
  <b>Built with ❤️ by You.</b>
</div>

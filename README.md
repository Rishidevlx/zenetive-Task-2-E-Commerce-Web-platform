<div align="center">
  
  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7ee69a103362143.5f4b5003fb7cb.gif" alt="Bakery Animation Banner" width="100%" />

  <br />
  <br />

  # 🍰 BakingShop - Premium Bakery E-Commerce
  
  **A fully functional, modern, and highly interactive MERN stack e-commerce application crafted for artisanal bakeries.**

  <p align="center">
    <a href="https://reactjs.org/">
      <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    </a>
    <a href="https://nodejs.org/">
      <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node JS" />
    </a>
    <a href="https://expressjs.com/">
      <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    </a>
    <a href="https://www.mongodb.com/">
      <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    </a>
    <a href="https://www.framer.com/motion/">
      <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    </a>
  </p>

  <p align="center">
    <i>Seamless User Experience • Interactive Product Cart • Secure Authentication • Interactive PDF Invoices</i>
  </p>
</div>

---

## ✨ Features That Stand Out

🍩 **Premium Interactive UI**  
Designed with `framer-motion` to provide a buttery-smooth scrolling experience, elegant page transitions, and floating 3D glassmorphism cards.

🛒 **Intelligent Cart System**  
Browse as a guest and add items directly to your cart effortlessly. The system securely persists guest cart data locally and synchronizes upon authenticating. Complete with **Animated Toast Notifications**!

🔐 **Secure Authentication Gateway**  
Robust JWT-based authentication system guarding the checkout process. Real-time form validations with strict Regex checks ensure clean data entry. 

💳 **Advanced Checkout Flow**  
Amazon-style checkout page with conditional billing address toggles, dynamic order summarization, and local storage state binding. 

📄 **Automatic PDF Invoice Generation**  
Upon a successful "Cash on Delivery" or "UPI" transaction, the system routes users to a beautiful Success screen where they can download a dynamically generated, structured PDF Bill containing their exact order schema and details!

🔎 **Functional Search & Filtering**  
Integrated seamless search engine right into the interactive Navigation Bar that dynamically filters the global product layout.

---

## 🛠️ Technology Stack

| Architecture Layer | Technologies Executed |
| :--- | :--- |
| **Frontend** | React (Vite), React Router v6, Context API, Framer Motion, Vanilla CSS (Custom Design System), Lucide React (Icons), jsPDF |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Security & Auth** | JSON Web Tokens (JWT), Bcrypt.js, CORS |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/en/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/bakingshop-ecommerce.git
cd bakingshop-ecommerce
```

**2. Install Server Dependencies & Start**
```bash
cd server
npm install
npm run dev
```

**3. Install Client Dependencies & Start**
```bash
cd ../client
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create `.env` files in both your root server and client folders.

**Server** (`server/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

**Client** (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
```

---

## 📸 Sneak Peek

<div align="center">
  <table>
    <tr>
      <td align="center"><b>Modern Auth Pages</b></td>
      <td align="center"><b>Checkout Validation & Logic</b></td>
    </tr>
    <tr>
      <td><img src="https://i.ibb.co/6P0xH26/auth.gif" alt="Auth Page" width="400"/></td>
      <td><img src="https://i.ibb.co/1qS8yX3/checkout.gif" alt="Checkout Page" width="400"/></td>
    </tr>
  </table>
  <br/>
  <i>*Note: Replace sneak peek images with actual UI screenshots for production presentation.*</i>
</div>

---

<div align="center">
  <br/>
  Let's build something delicious. 🥐 <br/>
  <b>Built with ❤️ by You.</b>
</div>

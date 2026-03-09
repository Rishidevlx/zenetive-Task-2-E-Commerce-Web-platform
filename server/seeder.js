const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');

dotenv.config();

const seedProducts = [
  {
    name: "Classic Chocolate Truffle Cake",
    description: "Rich, dense chocolate sponge layered with smooth chocolate ganache and finished with a dark chocolate glaze.",
    price: 450,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Cake",
    stock: 12
  },
  {
    name: "Strawberry Vanilla Pastry",
    description: "Light vanilla sponge cake with fresh strawberry compote and whipped cream frosting.",
    price: 90,
    imageUrl: "https://images.unsplash.com/photo-1621236378615-562a04910cfb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Pastry",
    stock: 25
  },
  {
    name: "Choco Chip Cookies (Box of 6)",
    description: "Crispy on the outside, chewy on the inside, overloaded with premium dark chocolate chips.",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Cookies",
    stock: 20
  },
  {
    name: "Red Velvet Cupcake",
    description: "Classic red velvet with a hint of cocoa, topped with signature cream cheese frosting.",
    price: 70,
    imageUrl: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Cupcakes",
    stock: 30
  },
  {
    name: "Fresh Butter Croissant",
    description: "Classic French-style, flaky, buttery, and golden-brown croissant baked fresh daily.",
    price: 85,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Bread",
    stock: 15
  },
  {
    name: "Blueberry Cheesecake",
    description: "Creamy baked New York-style cheesecake topped with a tangy homemade blueberry compote.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Cake",
    stock: 10
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert new dummy data
    await Product.insertMany(seedProducts);
    console.log('Dummy bakery products inserted successfully!');
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();

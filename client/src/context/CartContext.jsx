import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loadingCart, setLoadingCart] = useState(true);
  const [toastMsg, setToastMsg] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const savedCart = localStorage.getItem('bakery_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoadingCart(false);
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('bakery_cart', JSON.stringify(newCart));
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      // Fetch product to store details in local storage
      const res = await axios.get(`/api/products/${productId}`);
      const product = res.data;

      const newCart = { items: [...(cart?.items || [])] };
      const existingItemIndex = newCart.items.findIndex(
        (item) => item.productId._id === productId || item.productId === productId
      );

      if (existingItemIndex > -1) {
        newCart.items[existingItemIndex].quantity += Number(quantity);
      } else {
        newCart.items.push({
          productId: product, // storing the full product object to replicate populate()
          quantity: Number(quantity),
          price: product.price
        });
      }
      saveCart(newCart);
      setToastMsg(`Added ${product.name} to cart!`);
      setTimeout(() => setToastMsg(null), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    const newCart = { items: [...(cart?.items || [])] };
    const itemIndex = newCart.items.findIndex(
      (item) => item.productId._id === productId || item.productId === productId
    );
    if (itemIndex > -1) {
      newCart.items[itemIndex].quantity = Number(quantity);
      saveCart(newCart);
    }
  };

  const removeFromCart = (productId) => {
    const newCart = { items: [...(cart?.items || [])] };
    newCart.items = newCart.items.filter(
      (item) => item.productId._id !== productId && item.productId !== productId
    );
    saveCart(newCart);
  };

  const cartTotal = cart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0;
  const cartItemCount = cart?.items?.reduce((count, item) => count + item.quantity, 0) || 0;

  return (
    <CartContext.Provider value={{ cart, loadingCart, addToCart, updateQuantity, removeFromCart, cartTotal, cartItemCount }}>
      {children}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            style={{ position: 'fixed', bottom: '30px', right: '30px', background: 'white', color: 'var(--text-main)', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 9999, fontWeight: 'bold', borderLeft: '4px solid var(--primary)' }}
          >
            <CheckCircle color="var(--primary)" size={24} /> {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
};

export default CartContext;

import { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);
  const cartItems = cart?.items || [];
  const subtotal = cartTotal || 0;
  const deliveryFee = subtotal > 0 ? 50 : 0; // Changed to ₹50
  const [related, setRelated] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setRelated(res.data.sort(() => 0.5 - Math.random()).slice(0, 4)))
      .catch(console.error);
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', maxWidth: '500px', width: '100%' }}>
          <div style={{ width: '100px', height: '100px', background: 'var(--secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: 'var(--primary)' }}>
            <ShoppingCart size={40} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem' }}>Looks like you haven't added any delicious treats yet.</p>
          <Link to="/products" className="btn btn-primary" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-soft)', minHeight: '100vh', padding: '60px 0' }}>
      <div className="container">
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Your Shopping Cart</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Cart Items List */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <AnimatePresence>
              {cartItems.map(item => {
                const product = item.productId || {};
                return (
                <motion.div 
                  key={item._id || product._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50, height: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '25px', padding: '25px 0', borderBottom: '1px solid var(--border)' }}
                >
                  <img src={product.name === 'Strawberry Vanilla Pastry' ? 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop' : product.name === 'Fresh Butter Croissant' ? 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=1000&auto=format&fit=crop' : product.imageUrl || product.image} alt={product.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
                  
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>{product.category}</span>
                    <h3 style={{ fontSize: '1.4rem', margin: '5px 0 10px' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}>₹{item.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-soft)', borderRadius: '30px', padding: '5px' }}>
                    <button onClick={() => updateQuantity(product._id, item.quantity - 1)} className="btn" style={{ padding: '8px', background: 'white', border: '1px solid var(--border)', borderRadius: '50%', color: 'var(--primary)' }}>
                      <Minus size={16} />
                    </button>
                    <span style={{ margin: '0 20px', fontWeight: '700', fontSize: '1.1rem' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(product._id, item.quantity + 1)} className="btn" style={{ padding: '8px', background: 'white', border: '1px solid var(--border)', borderRadius: '50%', color: 'var(--primary)' }}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <div style={{ minWidth: '90px', textAlign: 'right', fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button 
                    onClick={() => removeFromCart(product._id)} 
                    style={{ background: '#fef2f2', border: 'none', color: 'var(--danger)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', marginLeft: '10px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = 'var(--danger)'; }}
                  >
                    <Trash2 size={18} />
                  </button>
                </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '25px', borderBottom: '2px solid var(--bg-soft)', paddingBottom: '15px' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{subtotal.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--text-muted)' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>₹{deliveryFee.toFixed(2)}</span>
            </div>

            <div style={{ borderTop: '2px dashed var(--border)', margin: '20px 0', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Total Amount</span>
              <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>₹{(subtotal + deliveryFee).toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
            <Link to="/products" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }}>
              Continue Shopping
            </Link>
          </div>
        </div>


        {/* Futuristic Related Products Section */}
        {related.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: '80px', padding: '40px', background: 'linear-gradient(135deg, rgba(236,243,158,0.3) 0%, rgba(255,255,255,0.8) 100%)', borderRadius: '24px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center', color: 'var(--primary)' }}>Pair perfectly with your order</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
              {related.map(r => (
                 <div key={r._id} className="card-hover-3d" style={{ background: 'white', padding: '20px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
                    <img src={r.imageUrl || r.image} alt={r.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} />
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', fontWeight: 'bold' }}>{r.name}</h4>
                    <div style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '1.1rem', marginBottom: '20px', marginTop: 'auto' }}>₹{r.price.toFixed(2)}</div>
                    <Link to={`/product/${r._id}`} className="btn btn-outline" style={{ padding: '10px', fontSize: '0.95rem' }}>View Details</Link>
                 </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default Cart;

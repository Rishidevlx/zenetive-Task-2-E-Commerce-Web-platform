import { motion } from 'framer-motion';
import { CreditCard, Wallet, Banknote, ArrowRight, ShieldCheck } from 'lucide-react';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Checkout = () => {
  const { cartTotal, cart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSameAsBilling, setIsSameAsBilling] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const subtotal = cartTotal || 0;
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const finalTotal = subtotal + deliveryFee;

  const handleCheckout = (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Basic Validation Checks
    if (!/^[0-9]{10}$/.test(data.phone)) {
       alert("Invalid syntax: Phone Number must be exactly 10 digits.");
       return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(data.email)) {
       alert("Invalid syntax: Please enter a correct email address format.");
       return;
    }

    // Compose Invoice Tracking Payload
    const invoiceTracker = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      items: cart?.items || [],
      subtotal,
      deliveryFee,
      finalTotal,
      customer: {
         name: data.firstName + ' ' + data.lastName,
         email: data.email,
         phone: data.phone,
         address: `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`
      },
      date: new Date().toLocaleDateString(),
      paymentMethod: paymentMethod === 'upi' ? 'UPI / Online' : 'Cash on Delivery'
    };

    // Simulate API delay for placing order
    setTimeout(() => {
      navigate('/order-success', { state: { invoiceTracker } });
    }, 800);
  };

  if (!user) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <h2 style={{ fontSize: '2rem' }}>Authentication Required</h2>
        <p style={{ color: 'var(--text-muted)' }}>You must be logged in to proceed to checkout.</p>
        <Link to="/login" className="btn btn-primary">Login or Register</Link>
      </div>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><h2>Empty Checkout</h2></div>;
  }

  const inputStyle = {
    width: '100%',
    padding: '10px 0',
    border: 'none',
    borderBottom: '1.5px solid var(--border)',
    outline: 'none',
    fontSize: '1rem',
    background: 'transparent',
    color: 'var(--text-main)',
    marginBottom: '30px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '700',
    letterSpacing: '1px',
    color: 'var(--text-muted)',
    textTransform: 'uppercase',
    marginBottom: '5px'
  };

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', padding: '60px 0', fontFamily: "'Outfit', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '400', fontFamily: 'serif' }}>Checkout</h1>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#e6f4ea', color: '#1e8e3e', padding: '6px 12px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            <ShieldCheck size={16} /> SSL Secured
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 5fr) minmax(0, 3fr)', gap: '60px' }}>
          
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
            {/* Delivery Address Section (Acting as Billing/Delivery per SS) */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '1rem' }}>1</span>
                  Delivery Address
                </h2>
                
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <input type="checkbox" checked={isSameAsBilling} onChange={(e) => setIsSameAsBilling(e.target.checked)} /> Same as Billing Address
                </label>
              </div>
              
              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>First Name</label>
                  <input type="text" name="firstName" required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Last Name</label>
                  <input type="text" name="lastName" required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" name="email" required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input type="tel" name="phone" required style={inputStyle} placeholder="10-digit mobile number" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Address</label>
                <input type="text" name="address" required style={inputStyle} />
              </div>

              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>City</label>
                  <input type="text" name="city" required style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>District</label>
                  <input type="text" name="district" required style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '30px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>State</label>
                  <select name="state" required style={inputStyle}>
                    <option>Tamil Nadu</option>
                    <option>Kerala</option>
                    <option>Karnataka</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Pincode</label>
                  <input type="text" name="pincode" required style={inputStyle} />
                </div>
              </div>
              
              <div>
                 <label style={labelStyle}>Order Notes (Optional)</label>
                 <input type="text" placeholder="Notes about your order..." style={inputStyle} />
              </div>
            </div>

            {/* Billing Address Section (Conditional) */}
            {!isSameAsBilling && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ overflow: 'hidden' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px' }}>
                  <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '1rem' }}>*</span>
                  Billing Address
                </h2>
                
                <div style={{ display: 'flex', gap: '30px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>First Name</label>
                    <input type="text" required={!isSameAsBilling} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Last Name</label>
                    <input type="text" required={!isSameAsBilling} style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '30px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Email Address</label>
                    <input type="email" required={!isSameAsBilling} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input type="tel" required={!isSameAsBilling} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Address</label>
                  <input type="text" required={!isSameAsBilling} style={inputStyle} />
                </div>

                <div style={{ display: 'flex', gap: '30px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={labelStyle}>City</label>
                    <input type="text" required={!isSameAsBilling} style={inputStyle} />
                  </div>
                  <div style={{ flex: 1 }}>
                     <label style={labelStyle}>State</label>
                     <select required={!isSameAsBilling} style={inputStyle}>
                       <option>Tamil Nadu</option>
                       <option>Kerala</option>
                       <option>Karnataka</option>
                     </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Pincode</label>
                  <input type="text" required={!isSameAsBilling} style={{...inputStyle, width: 'calc(50% - 15px)'}} />
                </div>
              </motion.div>
            )}

            {/* Payment Method */}
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '15px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '30px' }}>
                <span style={{ background: 'var(--primary)', color: 'white', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '1rem' }}>2</span>
                Payment Method
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: paymentMethod === 'upi' ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'upi' ? '#f4f7f4' : 'white', transition: 'all 0.2s' }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} style={{ width: '20px', height: '20px' }} />
                  <Wallet size={24} color="var(--primary)" />
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>UPI / GPay / PhonePe</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: paymentMethod === 'cod' ? '2px solid var(--primary)' : '1px solid var(--border)', borderRadius: '12px', cursor: 'pointer', background: paymentMethod === 'cod' ? '#f4f7f4' : 'white', transition: 'all 0.2s' }}>
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} style={{ width: '20px', height: '20px' }} />
                  <Banknote size={24} color="var(--primary)" />
                  <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>Cash on Delivery (COD)</span>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ padding: '18px', fontSize: '1.2rem', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              Place Order - ₹{finalTotal.toFixed(2)} <ArrowRight size={22} />
            </button>
          </form>

          {/* Checkout Summary Right Panel */}
          <div>
            <div style={{ background: 'white', padding: '40px', boxShadow: '0 4px 30px rgba(0,0,0,0.04)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '400', fontFamily: 'serif', marginBottom: '30px' }}>In Your Bag ({cart.items.length})</h3>
              
              <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '30px', paddingRight: '10px' }}>
                {cart.items.map(item => {
                  const prod = item.productId || {};
                  return (
                  <div key={item._id} style={{ display: 'flex', gap: '20px', marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #f0f0f0' }}>
                    <img src={prod.name === 'Strawberry Vanilla Pastry' ? 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop' : prod.name === 'Fresh Butter Croissant' ? 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=1000&auto=format&fit=crop' : prod.imageUrl || prod.image} alt={prod.name} style={{ width: '80px', height: '100px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#555', fontSize: '1.05rem', marginBottom: '4px' }}>{prod.name || 'Treat Item'}</span>
                      <span style={{ color: '#888', fontSize: '0.85rem', marginBottom: '10px', textTransform: 'lowercase' }}>{prod.category}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: 'auto' }}>
                        <span style={{ background: '#f5f5f5', padding: '4px 10px', fontSize: '0.8rem', fontWeight: '600', color: '#333' }}>Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#111', fontSize: '1.1rem' }}>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                  );
                })}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666', fontSize: '1rem' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: '500' }}>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: '#666', fontSize: '1rem' }}>
                <span>Shipping</span>
                <span style={{ color: '#e67e22', fontWeight: '500', fontSize: '0.9rem' }}>{deliveryFee === 0 ? 'Enter Address' : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', color: '#666', fontSize: '1rem' }}>
                <span>Tax (0%)</span>
                <span style={{ fontWeight: '500' }}>₹0.00</span>
              </div>

              <div style={{ borderTop: '2px solid #111', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111' }}>Total</span>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#111' }}>₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Checkout;

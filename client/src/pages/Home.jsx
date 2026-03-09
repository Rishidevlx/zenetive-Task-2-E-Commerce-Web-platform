import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Cake, Cookie, Coffee, Croissant, Gift } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await axios.get('/api/products');
        setFeaturedProducts(res.data.slice(0, 3)); // Just grab top 3
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeatures();
  }, []);

  const categories = [
    { name: 'Classic Cakes', icon: <Cake size={40} />, color: '#ffc1cc' },
    { name: 'Pastries', icon: <Croissant size={40} />, color: '#ecf39e' },
    { name: 'Cupcakes', icon: <Gift size={40} />, color: '#c1e1ff' },
    { name: 'Cookies', icon: <Cookie size={40} />, color: '#ffe4c1' },
    { name: 'Donuts', icon: <Coffee size={40} />, color: '#e5c1ff' }
  ];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>
      
      {/* Premium Hero Slider (Simulated via flex design) */}
      <div style={{ 
        position: 'relative', 
        height: '80vh', 
        minHeight: '600px',
        background: 'url("https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2600&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(19,42,19,0.9) 0%, rgba(19,42,19,0.4) 100%)' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10, color: 'white' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ color: 'var(--secondary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>Fresh From The Oven</span>
            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '20px', color: 'white', maxWidth: '700px', lineHeight: '1.1' }}>
              Handcrafted with Love & Premium Ingredients
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '500px', marginBottom: '40px', lineHeight: '1.6' }}>
              Order your favorite cakes, delicate pastries, and sweet desserts online. Delivered fresh to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/products" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '1.1rem' }}>
                Order Fresh Cakes Online
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Circular Categories */}
      <div className="container" style={{ marginTop: '-60px', position: 'relative', zIndex: 20 }}>
        <div className="glass-panel" style={{ borderRadius: '20px', padding: '40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', flex: '1 1 120px' }}
            >
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', marginBottom: '15px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', transition: 'all 0.3s' }}>
                {cat.icon}
              </div>
              <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Products Grid */}
      <div className="container" style={{ marginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '15px' }}>Signature Bakes</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Explore our most loved handcrafted delicacies, made entirely from scratch.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px', padding: '10px' }}>
          {featuredProducts.map(product => (
            <div key={product._id} style={{ borderRadius: '20px', overflow: 'hidden' }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Link to="/products" className="btn btn-outline" style={{ padding: '14px 40px', fontSize: '1.1rem' }}>
            View Full Menu <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Testimonials / Features */}
      <div style={{ background: 'var(--bg-soft)', marginTop: '100px', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <Star size={36} fill="var(--secondary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Premium Ingredients</h3>
              <p style={{ color: 'var(--text-muted)' }}>We source only the finest chocolate, real butter, and fresh local fruits for our bakes.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <Star size={36} fill="var(--secondary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Freshly Baked Daily</h3>
              <p style={{ color: 'var(--text-muted)' }}>Every single item is made fresh from scratch every morning in our local kitchen.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ background: 'white', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                <Star size={36} fill="var(--secondary)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Safe Delivery</h3>
              <p style={{ color: 'var(--text-muted)' }}>Meticulous packaging ensures your beautiful cakes arrive in perfect condition.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Divider SVG */}
      <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '100px' }}>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="var(--bg-soft)"></path>
        </svg>
      </div>

    </div>
  );
};

export default Home;

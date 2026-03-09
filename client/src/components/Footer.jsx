import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail, CakeSlice } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--primary)', color: 'white', paddingTop: '60px', paddingBottom: '20px', marginTop: 'auto' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        
        <div>
          <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <CakeSlice size={32} strokeWidth={2} /> BakingShop
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', marginBottom: '20px' }}>
            Baking memories since 2010. Handcrafted, freshly baked premium cakes and pastries delivered to your door.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{ color: 'white', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', transition: 'all 0.3s' }} className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" style={{ color: 'white', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', transition: 'all 0.3s' }} className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#" style={{ color: 'white', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', transition: 'all 0.3s' }} className="social-icon">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div>
          <h3 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Quick Links</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/products" style={{ color: 'rgba(255,255,255,0.7)' }}>Our Menu</Link></li>
            <li><Link to="/blog" style={{ color: 'rgba(255,255,255,0.7)' }}>Blog</Link></li>
            <li><Link to="/careers" style={{ color: 'rgba(255,255,255,0.7)' }}>Careers</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Customer Support</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)' }}>Help Center</Link></li>
            <li><Link to="/track" style={{ color: 'rgba(255,255,255,0.7)' }}>Order Tracking</Link></li>
            <li><Link to="/returns" style={{ color: 'rgba(255,255,255,0.7)' }}>Returns & Refunds</Link></li>
            <li><Link to="/faq" style={{ color: 'rgba(255,255,255,0.7)' }}>FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 style={{ color: 'white', marginBottom: '25px', fontSize: '1.2rem' }}>Contact Us</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: 'rgba(255,255,255,0.7)' }}>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <MapPin size={20} style={{ color: 'var(--secondary)', flexShrink: 0 }} /> 
              <span>123 Bakery Lane, Sweet Downtown, CA 90210</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Phone size={20} style={{ color: 'var(--secondary)' }} /> 
              <span>+1 (800) 123-4567</span>
            </li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Mail size={20} style={{ color: 'var(--secondary)' }} /> 
              <span>hello@bakingshop.com</span>
            </li>
          </ul>
        </div>

      </div>
      <div style={{ textAlign: 'center', marginTop: '30px', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
        &copy; {new Date().getFullYear()} BakingShop. All rights reserved.
      </div>
      <style>{`
        .social-icon:hover {
          background: var(--secondary) !important;
          color: var(--primary) !important;
          transform: translateY(-3px);
        }
        footer a:hover {
          color: var(--secondary) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;

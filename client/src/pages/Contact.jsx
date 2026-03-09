import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-soft)' }}>
      
      {/* Header */}
      <div style={{ background: 'var(--primary)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '15px', color: 'white' }}>Get in Touch</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem' }}>Have a question or a custom order? We'd love to hear from you.</p>
      </div>

      <div className="container" style={{ padding: '60px 20px', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
        
        {/* Contact Info */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: '1 1 350px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '30px' }}>Contact Information</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', fontSize: '1.1rem', lineHeight: '1.7' }}>
            Whether you're looking for an elaborate wedding cake, a simple birthday treat, or just want to report an issue with an order, our support team is ready to assist.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <motion.div whileHover={{ scale: 1.05, x: 10 }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '15px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                <MapPin color="var(--primary)" size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Our Bakery</h4>
                <p style={{ color: 'var(--text-muted)' }}>123 Bakery Lane, Sweet Downtown<br />Beverly Hills, CA 90210</p>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, x: 10 }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '15px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                <Phone color="var(--primary)" size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Call Us</h4>
                <p style={{ color: 'var(--text-muted)' }}>+1 (800) 123-4567<br />Mon-Fri 8am-6pm PST</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, x: 10 }} transition={{ type: 'spring', stiffness: 300 }} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '15px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                <Mail color="var(--primary)" size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Email Us</h4>
                <p style={{ color: 'var(--text-muted)' }}>hello@bakingshop.com<br />orders@bakingshop.com</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: '1 1 400px' }}>
          <div className="card-3d" style={{ background: 'white', padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '25px' }}>Send a Message</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Custom Cake Order</option>
                  <option>Feedback & Support</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;

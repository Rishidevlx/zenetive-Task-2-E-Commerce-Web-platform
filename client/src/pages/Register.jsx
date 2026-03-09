import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formError, setFormError] = useState('');

  const { name, email, password, confirmPassword } = formData;
  const navigate = useNavigate();
  const { registerUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (name.length < 3) {
      return setFormError('Name must be at least 3 characters long');
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      return setFormError('Please enter a valid email address (e.g., yourname@gmail.com)');
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    try {
      await registerUser({ name, email, password });
    } catch (err) {
      setFormError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-soft)', padding: '40px 20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="card-3d" 
        style={{ maxWidth: '450px', width: '100%', padding: '50px 40px', background: 'white' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '35px' }}>
          <motion.div 
            initial={{ rotate: 20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', damping: 10, bounce: 0.5 }}
            style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, var(--secondary) 0%, #fff 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          >
            <UserPlus size={40} />
          </motion.div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', fontFamily: "'Outfit', sans-serif", fontWeight: '800' }}>Join BakingShop</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Create an account to order fresh signature treats.</p>
        </div>
        
        {formError && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            style={{ color: '#d32f2f', background: '#ffebee', padding: '15px', borderLeft: '4px solid #d32f2f', borderRadius: '8px', marginBottom: '25px', textAlign: 'left', fontSize: '0.95rem', fontWeight: 'bold' }}
          >
            {formError}
          </motion.div>
        )}
        
        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', display: 'block' }}>Full Name</label>
            <input type="text" name="name" value={name} onChange={onChange} required placeholder="Enter your full name" style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--border)', outline: 'none', transition: 'all 0.3s', fontSize: '1.05rem', background: '#f8f9fa' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', display: 'block' }}>Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} required placeholder="Enter your email" style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--border)', outline: 'none', transition: 'all 0.3s', fontSize: '1.05rem', background: '#f8f9fa' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', display: 'block' }}>Password</label>
            <input type="password" name="password" value={password} onChange={onChange} required placeholder="••••••••" minLength="6" style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--border)', outline: 'none', transition: 'all 0.3s', fontSize: '1.05rem', background: '#f8f9fa' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700', color: 'var(--text-light)', marginBottom: '8px', display: 'block' }}>Confirm Password</label>
            <input type="password" name="confirmPassword" value={confirmPassword} onChange={onChange} required placeholder="••••••••" minLength="6" style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--border)', outline: 'none', transition: 'all 0.3s', fontSize: '1.05rem', background: '#f8f9fa' }} 
              onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <motion.button whileHover={{ scale: 1.02, translateY: -2 }} whileTap={{ scale: 0.95 }} type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 8px 15px rgba(253, 114, 21, 0.2)' }}>
            Create Account
          </motion.button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '35px', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ fontWeight: '700', color: 'var(--primary)', borderBottom: '2px solid var(--secondary)' }}>Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User as UserIcon, LogOut, Search, CakeSlice } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { cartItemCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchQuery.trim()){
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? { color: 'var(--primary)', fontWeight: '700' } : {};
  };

  return (
    <nav className="glass-panel" style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 40px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    }}>
      <Link to="/" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CakeSlice size={32} strokeWidth={2} /> BakingShop
      </Link>
      
      <div style={{ display: 'flex', gap: '30px', fontWeight: '600', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
        <Link to="/" style={isActive('/')}>Home</Link>
        <Link to="/products" style={isActive('/products')}>Our Menu</Link>
        <Link to="/contact" style={isActive('/contact')}>Contact</Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Search Bar Toggle */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence>
            {showSearch && (
              <motion.form 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '200px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSearchSubmit}
                style={{ overflow: 'hidden', marginRight: '10px' }}
              >
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search bakes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border)', outline: 'none' }}
                />
              </motion.form>
            )}
          </AnimatePresence>
          <button onClick={() => setShowSearch(!showSearch)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: '5px' }}>
            <Search size={22} />
          </button>
        </div>

        <motion.div whileHover={{ scale: 1.1, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
          <Link to="/cart" style={{ position: 'relative', color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
            <ShoppingBag size={24} /> 
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-8px',
                background: 'var(--danger)',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                border: '2px solid white'
              }}>
                {cartItemCount}
              </span>
            )}
          </Link>
        </motion.div>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 5px' }}></div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--primary)' }}>
              <UserIcon size={18} /> {user.name}
            </span>
            <button onClick={handleLogout} className="btn" style={{ padding: '6px', color: 'var(--text-muted)' }}>
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" className="btn btn-outline" style={{ padding: '8px 20px' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ padding: '8px 20px' }}>Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

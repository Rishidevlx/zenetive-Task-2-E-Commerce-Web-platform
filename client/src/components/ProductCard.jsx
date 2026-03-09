import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);

  const displayImage = product.name === 'Strawberry Vanilla Pastry' ? 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop' : product.name === 'Fresh Butter Croissant' ? 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=1000&auto=format&fit=crop' : product.imageUrl || product.image;

  return (
    <motion.div 
      className="card-3d card-hover-3d"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }}
    >
      <div className="image-zoom-container" style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
        <img 
          src={displayImage} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        
        {/* Quick View Button (Slide Up) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          style={{ position: 'absolute', bottom: '15px', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}
        >
          <Link to={`/product/${product._id}`} className="btn glass-panel" style={{ color: 'var(--primary)', padding: '8px 16px', borderRadius: '20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Eye size={16} /> Quick View
          </Link>
        </motion.div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
              {product.category}
            </span>
            <h3 style={{ fontSize: '1.3rem', margin: '5px 0' }}>
              <Link to={`/product/${product._id}`}>{product.name}</Link>
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--secondary)', color: 'var(--primary)', padding: '4px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            {product.rating} <Star size={12} fill="var(--primary)" />
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px', flexGrow: 1 }}>
          {product.description.substring(0, 60)}...
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
            ₹{product.price.toFixed(2)}
          </span>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product._id);
            }} 
            className="btn btn-primary"
            style={{ borderRadius: '50%', width: '45px', height: '45px', padding: '0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <ShoppingBag size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

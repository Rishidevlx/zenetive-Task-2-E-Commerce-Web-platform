import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSearch = queryParams.get('search') || '';
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ paddingBottom: '100px', background: 'var(--bg-soft)', minHeight: '100vh' }}>
      
      {/* Header Banner */}
      <div style={{ background: 'var(--primary)', color: 'white', padding: '60px 0', marginBottom: '60px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '15px', color: 'white' }}>Our Delicious Menu</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Browse our entire collection of handcrafted signature cakes, pastries, and treats.
          </p>
        </div>
      </div>

      <div className="container">
        
        {/* Filters and Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', background: 'white', padding: '15px 25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {['All', 'Cake', 'Pastry', 'Cookies', 'Bread'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`btn ${category === cat ? 'btn-primary' : 'btn-outline'}`} 
                style={category === cat ? { padding: '8px 20px' } : { border: 'none', background: 'var(--bg-soft)', padding: '8px 20px' }}>
                {cat}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search treats..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '10px 15px 10px 40px', borderRadius: '20px', border: '1px solid var(--border)', outline: 'none', minWidth: '250px' }} 
              />
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '1.2rem', color: 'var(--text-muted)' }}>
            Loading delicious treats...
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}
          >
            {products
              .filter(p => category === 'All' || p.category === category)
              .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;

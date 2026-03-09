import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Loader2, Minus, Plus } from 'lucide-react';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState({ label: '1 Kg', multiplier: 1 });
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error('Error fetching product', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return setReviewMessage('Please login to submit a review');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`/api/products/${id}/reviews`, { rating, comment }, config);
      setReviewMessage('Review submitted successfully!');
      setComment('');
      setRating(5);
      fetchProduct(); // Refresh product data
    } catch (err) {
      setReviewMessage(err.response?.data?.message || 'Error submitting review');
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
        <Loader2 size={48} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    </div>
  );

  if (!product) return (
    <div>
      <div style={{ textAlign: 'center', marginTop: '100px' }}><h2>Product not found</h2></div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <div className="container" style={{ flex: 1, paddingBottom: '80px', marginTop: '20px' }}>
        <Link to="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '30px', fontWeight: '500' }}>
          <ArrowLeft size={20} /> Back to Menu
        </Link>

        <div className="glass card" style={{ display: 'flex', gap: '40px', padding: '40px', flexWrap: 'wrap' }}>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ flex: '1 1 400px' }}
          >
            <img 
              src={product.name === 'Strawberry Vanilla Pastry' ? 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop' : product.name === 'Fresh Butter Croissant' ? 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=1000&auto=format&fit=crop' : product.imageUrl || product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '500px', borderRadius: '20px', objectFit: 'cover', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}
          >
            <span style={{ display: 'inline-block', background: 'var(--primary-light)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.9rem', width: 'fit-content', fontWeight: 'bold', marginBottom: '15px' }}>
              {product.category}
            </span>
            
            <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '15px' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: '#f59e0b' }}>
               {[...Array(5)].map((_, i) => (
                 <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
               ))}
               <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginLeft: '5px' }}>({product.numReviews || 0} Customer Reviews)</span>
            </div>
            
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '25px' }}>
              {product.description}
            </p>

            {product.category === 'Cake' && (
              <div style={{ marginBottom: '25px' }}>
                <span style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>Select Size:</span>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {[{ label: '0.5 Kg', multiplier: 0.5 }, { label: '1 Kg', multiplier: 1 }, { label: '2 Kg', multiplier: 2 }].map((size) => (
                    <button 
                      key={size.label} 
                      onClick={() => setSelectedSize(size)}
                      style={{ padding: '10px 20px', borderRadius: '12px', border: selectedSize.label === size.label ? '2px solid var(--primary)' : '1px solid var(--border)', background: selectedSize.label === size.label ? 'var(--bg-soft)' : 'white', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginTop: 'auto', marginBottom: '30px' }}>
              ₹{(product.price * (product.category === 'Cake' ? selectedSize.multiplier : 1)).toFixed(2)}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'white', border: '2px solid var(--border)', borderRadius: '12px', padding: '5px' }}>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '12px', border: 'none', background: 'var(--surface)', cursor: 'pointer', borderRadius: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Minus size={18} />
                </button>
                <span style={{ padding: '0 25px', fontWeight: 'bold', fontSize: '1.2rem' }}>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '12px', border: 'none', background: 'var(--surface)', cursor: 'pointer', borderRadius: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <button 
                className="btn btn-primary" 
                style={{ flex: 1, padding: '18px 24px', fontSize: '1.2rem', minWidth: '200px' }}
                onClick={() => addToCart(product._id, quantity)}
              >
                <ShoppingBag size={24} /> Add to Cart
              </button>
            </div>
          </motion.div>
        </div>

        {/* Real Reviews Section */}
        <div style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid var(--border)', paddingBottom: '15px' }}>Customer Reviews</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '40px' }}>
            
            {/* Reviews List */}
            <div>
              {!product.reviews || product.reviews.length === 0 ? (
                <div style={{ padding: '30px', background: 'white', borderRadius: '16px', color: 'var(--text-muted)', textAlign: 'center' }}>
                  No reviews yet. Be the first to review this {product.category.toLowerCase()}!
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {product.reviews.map(review => (
                    <div key={review._id} style={{ background: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{review.name}</span>
                        <div style={{ display: 'flex', color: '#f59e0b' }}>
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                          ))}
                        </div>
                      </div>
                      <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '15px' }}>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                      <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Write a Review */}
            <div>
              <div style={{ background: 'var(--primary-light)', padding: '30px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'var(--primary)' }}>Write a Review</h3>
                
                {user ? (
                  <form onSubmit={submitReview}>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ color: 'var(--primary)' }}>Rating</label>
                      <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', outline: 'none' }}>
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '15px' }}>
                      <label style={{ color: 'var(--primary)' }}>Comment</label>
                      <textarea 
                        rows="4" 
                        required 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts about this treat..."
                        style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', width: '100%', outline: 'none', resize: 'vertical' }}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Review</button>
                    {reviewMessage && <div style={{ marginTop: '15px', color: reviewMessage.includes('Login') || reviewMessage.includes('Error') ? 'var(--danger)' : 'var(--success)', fontWeight: 'bold' }}>{reviewMessage}</div>}
                  </form>
                ) : (
                  <div style={{ background: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '15px', color: 'var(--text-muted)' }}>You must be logged in to share your experience.</p>
                    <Link to="/login" className="btn btn-outline" style={{ display: 'inline-block' }}>Login / Register</Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductDetail;

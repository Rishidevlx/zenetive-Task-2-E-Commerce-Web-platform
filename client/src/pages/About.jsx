import { motion } from 'framer-motion';
import { ChefHat, Heart, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Hero Section */}
      <div style={{ background: 'var(--primary)', color: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ fontSize: '3.5rem', marginBottom: '15px', color: 'white' }}
          >
            Our Baking Story
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto' }}
          >
            Handcrafted with passion, baked with love, and delivered directly to you.
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ flex: 1, padding: '80px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center', marginBottom: '100px' }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img 
              src="https://images.unsplash.com/photo-1556217477-d325251ece38?q=80&w=2000&auto=format&fit=crop" 
              alt="Bakery Interior" 
              style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>A Tradition of Excellence</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '20px', lineHeight: '1.8' }}>
              Founded in 2010, BakingShop began with a simple mission: to create the most delicious and beautiful cakes using only premium, natural ingredients. No preservatives, no shortcuts. Just pure passion for baking.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              Every morning, our master bakers arrive before sunrise to start kneading dough, whisking cream, and temper chocolate. We believe that true quality takes time, and you can taste that dedication in every single bite.
            </p>
          </motion.div>
        </div>

        {/* Value Props */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card-3d" style={{ padding: '40px 20px', background: 'white' }}>
            <ChefHat size={48} color="var(--primary)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Master Bakers</h3>
            <p style={{ color: 'var(--text-muted)' }}>Our team consists of highly trained pastry chefs with decades of experience.</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="card-3d" style={{ padding: '40px 20px', background: 'var(--secondary)' }}>
            <Heart size={48} color="var(--primary)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Made With Love</h3>
            <p style={{ color: 'var(--primary)' }}>Every cake is hand-decorated with meticulous attention to detail.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="card-3d" style={{ padding: '40px 20px', background: 'white' }}>
            <Award size={48} color="var(--primary)" style={{ margin: '0 auto 20px' }} />
            <h3 style={{ fontSize: '1.4rem', marginBottom: '15px' }}>Premium Quality</h3>
            <p style={{ color: 'var(--text-muted)' }}>We source the finest ingredients locally and internationally.</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default About;

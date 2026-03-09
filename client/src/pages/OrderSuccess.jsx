import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, ShoppingBag, FileText } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import CartContext from '../context/CartContext';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

const OrderSuccess = () => {
  const { cartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const invoice = location.state?.invoiceTracker || null;

  useEffect(() => {
    // Clear the cart purely locally without interfering with context setup
    localStorage.removeItem('bakery_cart');
  }, []);

  const generatePDF = () => {
    if (!invoice) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 142, 62);
    doc.text('BakingShop Invoice', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Order ID: ${invoice.orderId}`, 15, 30);
    doc.text(`Date: ${invoice.date}`, 150, 30);
    
    // Customer Info
    doc.setFontSize(12);
    doc.setTextColor(20);
    doc.text('Billed To:', 15, 45);
    doc.setFontSize(10);
    doc.text(`${invoice.customer.name}`, 15, 52);
    doc.text(`${invoice.customer.email} | ${invoice.customer.phone}`, 15, 58);
    doc.text(`${invoice.customer.address}`, 15, 64);
    
    // Items Table
    const tableColumn = ["Item", "Category", "Quantity", "Price (INR)", "Total"];
    const tableRows = [];

    invoice.items.forEach(item => {
      const prod = item.productId;
      const itemData = [
        prod.name,
        prod.category,
        item.quantity,
        `Rs ${item.price.toFixed(2)}`,
        `Rs ${(item.price * item.quantity).toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    autoTable(doc, {
      startY: 75,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      headStyles: { fillColor: [30, 142, 62] }
    });

    const finalY = doc.lastAutoTable.finalY || 75;
    
    // Summary
    doc.setFontSize(11);
    doc.text(`Subtotal: Rs ${invoice.subtotal.toFixed(2)}`, 140, finalY + 10);
    doc.text(`Delivery Fee: Rs ${invoice.deliveryFee.toFixed(2)}`, 140, finalY + 18);
    doc.setFontSize(13);
    doc.setTextColor(30, 142, 62);
    doc.text(`Final Total: Rs ${invoice.finalTotal.toFixed(2)}`, 140, finalY + 28);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Payment Method: ${invoice.paymentMethod}`, 15, finalY + 28);

    // Save
    doc.save(`${invoice.orderId}-Bill.pdf`);
  };

  return (
    <div style={{ background: '#fafafa', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: "'Outfit', sans-serif" }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        style={{ background: 'white', padding: '60px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', textAlign: 'center', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15 }}
          style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #e6f4ea 0%, #a8d5ba 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', color: '#1e8e3e', boxShadow: '0 10px 20px rgba(30,142,62,0.2)' }}
        >
          <CheckCircle size={50} />
        </motion.div>
        
        <h1 style={{ fontSize: '2.8rem', marginBottom: '15px', color: '#222' }}>Order Confirmed!</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '40px' }}>
          Thank you for choosing BakingShop! Your delicious treats are being prepared with love and will be on their way shortly.
        </p>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '16px', marginBottom: '30px', border: '1px dashed #ccc' }}>
           <p style={{ fontWeight: '600', color: '#333', fontSize: '1.1rem', marginBottom: '5px' }}>Order Status: <span style={{ color: '#1e8e3e' }}>Processing</span></p>
           {invoice && <p style={{ color: '#777', fontSize: '1rem', fontWeight: 'bold' }}>Order ID: {invoice.orderId}</p>}
           <p style={{ color: '#777', fontSize: '0.95rem' }}>You will receive an SMS update on your registered number.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {invoice && (
             <button onClick={generatePDF} className="btn" style={{ background: '#fff', border: '2px solid var(--primary)', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 30px', fontSize: '1.1rem', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>
               <FileText size={20} /> Download PDF Bill
             </button>
          )}

          <Link to="/" onClick={() => window.location.href = "/"} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '16px 30px', fontSize: '1.2rem', borderRadius: '30px' }}>
            <ShoppingBag size={20} /> Back to Bakery
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;

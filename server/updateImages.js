const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bakery', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB connected...');
  
  // Define Product schema if needed or just use raw collection
  const db = mongoose.connection;
  
  const strawberryResult = await db.collection('products').updateOne(
    { name: 'Strawberry Vanilla Pastry' },
    { $set: { imageUrl: 'https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1000&auto=format&fit=crop' } }
  );
  console.log('Strawberry Pastry Update:', strawberryResult);

  const croissantResult = await db.collection('products').updateOne(
    { name: 'Fresh Butter Croissant' },
    { $set: { imageUrl: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?q=80&w=1000&auto=format&fit=crop' } }
  );
  console.log('Butter Croissant Update:', croissantResult);
  
  mongoose.disconnect();
})
.catch(err => console.log(err));

const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// Helper to get or create cart
const getCartOrCreate = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }
  return cart;
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const cart = await getCartOrCreate(req.user.id);
    
    // We populate the inner productId so frontend gets name, price, img etc.
    await cart.populate({
      path: 'items.productId',
      select: 'name price imageUrl stock category'
    });
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
router.post('/add', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const product = await Product.findById(productId);
    if (!product) {
       return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await getCartOrCreate(req.user.id);

    // Check if item already in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Prevent duplicate entry by updating quantity
      cart.items[existingItemIndex].quantity += Number(quantity);
    } else {
      // Add new item
      cart.items.push({
        productId,
        quantity: Number(quantity),
        price: product.price
      });
    }

    await cart.save();
    
    await cart.populate({
      path: 'items.productId',
      select: 'name price imageUrl stock category'
    });

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Update item quantity
// @route   PUT /api/cart/update
// @access  Private
router.put('/update', protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be greater than zero' });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = Number(quantity);
      await cart.save();
      
      await cart.populate({
        path: 'items.productId',
        select: 'name price imageUrl stock category'
      });
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:productId
// @access  Private
router.delete('/remove/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await cart.save();

    await cart.populate({
      path: 'items.productId',
      select: 'name price imageUrl stock category'
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @desc    Clear cart
// @route   DELETE /api/cart/clear
// @access  Private
router.delete('/clear', protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if(cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch(error) {
        res.status(500).json({ message: 'Server Error', error: error.message});
    }
})

module.exports = router;

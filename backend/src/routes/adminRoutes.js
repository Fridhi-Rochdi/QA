const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middlewares/auth');
const { Op } = require('sequelize');
const { User, Product, Order, OrderItem } = require('../models');

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const pendingOrders = await Order.count({ where: { status: 'en_attente' } });
    const activeVendors = await User.count({ where: { role: 'vendeur' } });

    const orders = await Order.findAll({
      where: { paymentStatus: 'payee' }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.totalPrice), 0);

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      activeVendors
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['motDePasse'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Prevent deleting admin users
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Impossible de supprimer un administrateur' });
    }

    await user.destroy();
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/admin/users/:id/role
// @desc    Change user role
// @access  Private/Admin
router.patch('/users/:id/role', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    user.role = role;
    await user.save();

    res.json({ message: 'Rôle mis à jour avec succès', user });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/products
// @desc    Get all products
// @access  Private/Admin
router.get('/products', protect, authorize('admin'), async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [{
        model: User,
        as: 'Vendeur',
        attributes: ['id', 'nom', 'prenom', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/products/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    await product.destroy();
    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/admin/products/:id/status
// @desc    Toggle product availability
// @access  Private/Admin
router.patch('/products/:id/status', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { disponible } = req.body;
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    product.disponible = disponible;
    await product.save();

    res.json({ message: 'Statut mis à jour avec succès', product });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/orders', protect, authorize('admin'), async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: 'Client',
          attributes: ['id', 'nom', 'prenom', 'email']
        },
        {
          model: OrderItem,
          as: 'OrderItems',
          include: [{
            model: Product,
            attributes: ['id', 'nom', 'prix', 'imageUrl']
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/admin/orders/:id
// @desc    Get order by ID
// @access  Private/Admin
router.get('/orders/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'Client',
          attributes: ['id', 'nom', 'prenom', 'email', 'telephone']
        },
        {
          model: OrderItem,
          as: 'OrderItems',
          include: [{
            model: Product,
            attributes: ['id', 'nom', 'prix', 'imageUrl']
          }]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/admin/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.patch('/orders/:id/status', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Statut mis à jour avec succès', order });
  } catch (error) {
    next(error);
  }
});

// @route   PATCH /api/admin/orders/:id/payment
// @desc    Update payment status
// @access  Private/Admin
router.patch('/orders/:id/payment', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { paymentStatus } = req.body;
    const order = await Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.paymentStatus = paymentStatus;
    await order.save();

    res.json({ message: 'Statut de paiement mis à jour', order });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

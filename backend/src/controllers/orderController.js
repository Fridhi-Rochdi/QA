const { Order, OrderItem, Product, User } = require('../models');
const { sequelize } = require('../config/database');

// Générer un numéro de commande unique
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CMD-${timestamp}-${random}`;
};

// @desc    Créer une commande
// @route   POST /api/orders
// @access  Private (Client)
const createOrder = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      await t.rollback();
      return res.status(400).json({ error: 'La commande doit contenir au moins un produit' });
    }

    let totalAmount = 0;
    const orderItemsData = [];

    // Vérifier les produits et calculer le total
    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        await t.rollback();
        return res.status(404).json({ error: `Produit ${item.productId} non trouvé` });
      }

      if (!product.isActive) {
        await t.rollback();
        return res.status(400).json({ error: `Le produit ${product.name} n'est plus disponible` });
      }

      if (product.stock < item.quantity) {
        await t.rollback();
        return res.status(400).json({ 
          error: `Stock insuffisant pour ${product.name}. Stock disponible: ${product.stock}` 
        });
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItemsData.push({
        productId: product.id,
        vendorId: product.vendorId,
        quantity: item.quantity,
        unitPrice: product.price,
        totalPrice: itemTotal
      });

      // Réduire le stock
      product.stock -= item.quantity;
      await product.save({ transaction: t });
    }

    // Créer la commande
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      clientId: req.user.id,
      totalAmount,
      shippingAddress,
      paymentMethod,
      status: 'en_attente',
      paymentStatus: 'en_attente'
    }, { transaction: t });

    // Créer les items de commande
    const orderItems = await Promise.all(
      orderItemsData.map(itemData => 
        OrderItem.create({
          ...itemData,
          orderId: order.id
        }, { transaction: t })
      )
    );

    await t.commit();

    // Récupérer la commande complète avec les relations
    const fullOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            { model: Product, as: 'product' },
            { model: User, as: 'vendor', attributes: ['id', 'firstName', 'lastName'] }
          ]
        }
      ]
    });

    res.status(201).json({ order: fullOrder });
  } catch (error) {
    await t.rollback();
    next(error);
  }
};

// @desc    Récupérer les commandes du client connecté
// @route   GET /api/orders/me
// @access  Private (Client)
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { clientId: req.user.id },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [
          { model: Product, as: 'product' },
          { model: User, as: 'vendor', attributes: ['id', 'firstName', 'lastName'] }
        ]
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({ orders, count: orders.length });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer une commande par ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            { model: Product, as: 'product' },
            { model: User, as: 'vendor', attributes: ['id', 'firstName', 'lastName'] }
          ]
        },
        {
          model: User,
          as: 'client',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    // Vérifier que l'utilisateur a le droit de voir cette commande
    if (order.clientId !== req.user.id && req.user.role !== 'admin' && req.user.role !== 'vendeur') {
      return res.status(403).json({ error: 'Non autorisé à voir cette commande' });
    }

    res.json({ order });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour le statut d'une commande
// @route   PUT /api/orders/:id/status
// @access  Private (Vendeur/Admin)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ error: 'Commande non trouvée' });
    }

    order.status = status;
    await order.save();

    res.json({ order });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer les ventes du vendeur connecté
// @route   GET /api/orders/vendor/sales
// @access  Private (Vendeur)
const getVendorSales = async (req, res, next) => {
  try {
    const sales = await OrderItem.findAll({
      where: { vendorId: req.user.id },
      include: [
        { model: Product, as: 'product' },
        { 
          model: Order, 
          as: 'order',
          include: [{
            model: User,
            as: 'client',
            attributes: ['firstName', 'lastName', 'email']
          }]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ sales, count: sales.length });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getVendorSales
};

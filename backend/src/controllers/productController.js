const { Product, User } = require('../models');
const { Op } = require('sequelize');

// @desc    Récupérer tous les produits (avec filtres)
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res, next) => {
  try {
    const { category, minPrice, maxPrice, search, vendorId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const where = { isActive: true };

    if (category) {
      where.category = category;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } }
      ];
    }

    if (vendorId) {
      where.vendorId = vendorId;
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      include: [{
        model: User,
        as: 'vendor',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      products,
      pagination: {
        total: count,
        page,
        pages: Math.ceil(count / limit),
        limit
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer un produit par ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{
        model: User,
        as: 'vendor',
        attributes: ['id', 'firstName', 'lastName', 'email']
      }]
    });

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc    Créer un produit
// @route   POST /api/products
// @access  Private (Vendeur)
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, category, images, image_url, isActive } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images: images || [],
      image_url: image_url || null,
      isActive: isActive !== undefined ? isActive : true,
      vendorId: req.user.id
    });

    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Private (Vendeur propriétaire)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    // Vérifier que l'utilisateur est le propriétaire du produit
    if (product.vendorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Non autorisé à modifier ce produit' });
    }

    const { name, description, price, stock, category, images, image_url, isActive } = req.body;

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price !== undefined ? price : product.price;
    product.image_url = image_url !== undefined ? image_url : product.image_url;
    product.stock = stock !== undefined ? stock : product.stock;
    product.category = category || product.category;
    product.images = images || product.images;
    product.isActive = isActive !== undefined ? isActive : product.isActive;

    await product.save();

    res.json({ product });
  } catch (error) {
    next(error);
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Private (Vendeur propriétaire)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    // Vérifier que l'utilisateur est le propriétaire du produit
    if (product.vendorId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Non autorisé à supprimer ce produit' });
    }

    await product.destroy();

    res.json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    next(error);
  }
};

// @desc    Récupérer les produits du vendeur connecté
// @route   GET /api/products/vendor/me
// @access  Private (Vendeur)
const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { vendorId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ products, count: products.length });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
};

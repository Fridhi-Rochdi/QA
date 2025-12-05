const User = require('./User');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Relations entre les modèles

// Un vendeur a plusieurs produits
User.hasMany(Product, {
  foreignKey: 'vendorId',
  as: 'products'
});
Product.belongsTo(User, {
  foreignKey: 'vendorId',
  as: 'vendor'
});

// Un client a plusieurs commandes
User.hasMany(Order, {
  foreignKey: 'clientId',
  as: 'orders'
});
Order.belongsTo(User, {
  foreignKey: 'clientId',
  as: 'client'
});

// Une commande a plusieurs items
Order.hasMany(OrderItem, {
  foreignKey: 'orderId',
  as: 'items'
});
OrderItem.belongsTo(Order, {
  foreignKey: 'orderId',
  as: 'order'
});

// Un produit peut être dans plusieurs items de commande
Product.hasMany(OrderItem, {
  foreignKey: 'productId',
  as: 'orderItems'
});
OrderItem.belongsTo(Product, {
  foreignKey: 'productId',
  as: 'product'
});

// Un vendeur a plusieurs items de commande
User.hasMany(OrderItem, {
  foreignKey: 'vendorId',
  as: 'sales'
});
OrderItem.belongsTo(User, {
  foreignKey: 'vendorId',
  as: 'vendor'
});

module.exports = {
  User,
  Product,
  Order,
  OrderItem
};

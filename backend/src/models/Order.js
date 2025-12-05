const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  orderNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'en_attente',
    validate: {
      isIn: [['en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee']]
    }
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  shippingAddress: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: false
  },
  paymentStatus: {
    type: DataTypes.STRING,
    defaultValue: 'en_attente',
    validate: {
      isIn: [['en_attente', 'payee', 'echouee', 'remboursee']]
    }
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;

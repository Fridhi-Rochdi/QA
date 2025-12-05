import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data.orders);
    } catch (err) {
      setError('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      en_attente: { class: 'badge-warning', label: 'En attente' },
      confirmee: { class: 'badge-info', label: 'Confirmée' },
      en_preparation: { class: 'badge-info', label: 'En préparation' },
      expediee: { class: 'badge-info', label: 'Expédiée' },
      livree: { class: 'badge-success', label: 'Livrée' },
      annulee: { class: 'badge-danger', label: 'Annulée' }
    };
    const config = statusConfig[status] || statusConfig.en_attente;
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      en_attente: { class: 'badge-warning', label: 'En attente' },
      payee: { class: 'badge-success', label: 'Payée' },
      echouee: { class: 'badge-danger', label: 'Échouée' },
      remboursee: { class: 'badge-info', label: 'Remboursée' }
    };
    const config = statusConfig[status] || statusConfig.en_attente;
    return <span className={`badge ${config.class}`}>{config.label}</span>;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>📦 Mes Commandes</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Aucune commande</h2>
          <p style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>
            Vous n'avez pas encore passé de commande
          </p>
          <Link to="/products" className="btn btn-primary">
            Parcourir les produits
          </Link>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>
                    Commande #{order.orderNumber}
                  </h3>
                  <p style={{ color: 'var(--secondary-color)', fontSize: '0.875rem' }}>
                    Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {getStatusBadge(order.status)}
                  {getPaymentStatusBadge(order.paymentStatus)}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Articles :</h4>
                {order.items?.map((item, index) => (
                  <div key={index} style={{ 
                    padding: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.375rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{item.product?.name} × {item.quantity}</span>
                      <span style={{ fontWeight: 'bold' }}>
                        {parseFloat(item.totalPrice).toFixed(2)} €
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--secondary-color)' }}>
                      Vendu par: {item.vendor?.firstName} {item.vendor?.lastName}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
                    Adresse de livraison: {order.shippingAddress}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)' }}>
                    Mode de paiement: {order.paymentMethod}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {parseFloat(order.totalAmount).toFixed(2)} €
                  </p>
                  <Link to={`/orders/${order.id}`} className="btn btn-secondary" style={{ marginTop: '0.5rem' }}>
                    Voir les détails
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

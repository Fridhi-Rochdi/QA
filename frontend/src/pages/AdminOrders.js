import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/orders');
      setOrders(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
      alert('Erreur lors du chargement des commandes');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus });
      alert('Statut mis à jour avec succès');
      loadOrders();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const handleUpdatePaymentStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}/payment`, { paymentStatus: newStatus });
      alert('Statut de paiement mis à jour');
      loadOrders();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour');
    }
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      en_attente: { background: '#fef3c7', color: '#d97706' },
      confirmee: { background: '#dbeafe', color: '#2563eb' },
      en_cours: { background: '#fde68a', color: '#f59e0b' },
      livree: { background: '#dcfce7', color: '#16a34a' },
      annulee: { background: '#fee2e2', color: '#dc2626' }
    };
    return styles[status] || {};
  };

  const getPaymentBadgeStyle = (status) => {
    const styles = {
      en_attente: { background: '#fef3c7', color: '#d97706' },
      payee: { background: '#dcfce7', color: '#16a34a' },
      echouee: { background: '#fee2e2', color: '#dc2626' }
    };
    return styles[status] || {};
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === '' || order.status === statusFilter;
    const matchesPayment = paymentFilter === '' || order.paymentStatus === paymentFilter;
    return matchesStatus && matchesPayment;
  });

  if (loading) {
    return <div className="container"><p>Chargement...</p></div>;
  }

  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'payee')
    .reduce((sum, o) => sum + parseFloat(o.totalPrice), 0);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gestion des Commandes</h1>
        <Link to="/admin" className="btn btn-secondary">
          ← Retour au Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div className="form-group">
            <label>Statut Commande</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
            >
              <option value="">Tous</option>
              <option value="en_attente">En Attente</option>
              <option value="confirmee">Confirmée</option>
              <option value="en_cours">En Cours</option>
              <option value="livree">Livrée</option>
              <option value="annulee">Annulée</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Statut Paiement</label>
            <select 
              value={paymentFilter} 
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="form-control"
            >
              <option value="">Tous</option>
              <option value="en_attente">En Attente</option>
              <option value="payee">Payée</option>
              <option value="echouee">Échouée</option>
            </select>
          </div>

          <button onClick={() => { setStatusFilter(''); setPaymentFilter(''); }} className="btn btn-secondary">
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div className="card" style={{ textAlign: 'center', background: '#f0f9ff' }}>
          <h3 style={{ margin: 0, color: '#0369a1' }}>{orders.length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Total Commandes</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#fef3c7' }}>
          <h3 style={{ margin: 0, color: '#d97706' }}>
            {orders.filter(o => o.status === 'en_attente').length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>En Attente</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#dcfce7' }}>
          <h3 style={{ margin: 0, color: '#16a34a' }}>
            {orders.filter(o => o.status === 'livree').length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Livrées</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#f0fdf4' }}>
          <h3 style={{ margin: 0, color: '#15803d' }}>{totalRevenue.toFixed(2)} DT</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Revenus Total</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Commande #</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Client</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Total</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Statut</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Paiement</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Date</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong>#{order.id.substring(0, 8)}</strong>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {order.Client ? (
                        <div>
                          <div>{order.Client.nom} {order.Client.prenom}</div>
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            {order.Client.email}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#999' }}>N/A</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <strong>{parseFloat(order.totalPrice).toFixed(2)} DT</strong>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          border: '1px solid #d1d5db',
                          cursor: 'pointer',
                          ...getStatusBadgeStyle(order.status)
                        }}
                      >
                        <option value="en_attente">En Attente</option>
                        <option value="confirmee">Confirmée</option>
                        <option value="en_cours">En Cours</option>
                        <option value="livree">Livrée</option>
                        <option value="annulee">Annulée</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => handleUpdatePaymentStatus(order.id, e.target.value)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          border: '1px solid #d1d5db',
                          cursor: 'pointer',
                          ...getPaymentBadgeStyle(order.paymentStatus)
                        }}
                      >
                        <option value="en_attente">En Attente</option>
                        <option value="payee">Payée</option>
                        <option value="echouee">Échouée</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <Link 
                        to={`/admin/orders/${order.id}`}
                        className="btn btn-secondary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                      >
                        👁️ Détails
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

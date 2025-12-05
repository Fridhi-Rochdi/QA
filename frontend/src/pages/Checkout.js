import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/orderService';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shippingAddress: user?.address || '',
    paymentMethod: 'carte_bancaire'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.shippingAddress) {
      setError('Veuillez renseigner une adresse de livraison');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod
      };

      await createOrder(orderData);
      clearCart();
      alert('✅ Commande passée avec succès !');
      navigate('/orders');
    } catch (err) {
      setError(err.error || 'Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container" style={{ marginTop: '2rem', maxWidth: '800px' }}>
      <h1 style={{ marginBottom: '2rem' }}>📦 Finaliser la commande</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Informations de livraison</h2>

          <div className="form-group">
            <label className="form-label">Nom complet</label>
            <input
              type="text"
              className="form-input"
              value={`${user?.firstName} ${user?.lastName}`}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={user?.email}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Téléphone</label>
            <input
              type="tel"
              className="form-input"
              value={user?.phone || ''}
              disabled
            />
          </div>

          <div className="form-group">
            <label className="form-label">Adresse de livraison *</label>
            <textarea
              name="shippingAddress"
              className="form-textarea"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Numéro, rue, ville, code postal, pays"
            />
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Mode de paiement</h2>

          <div className="form-group">
            <label className="form-label">Choisissez votre mode de paiement</label>
            <select
              name="paymentMethod"
              className="form-select"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="carte_bancaire">💳 Carte bancaire</option>
              <option value="paypal">💰 PayPal</option>
              <option value="virement">🏦 Virement bancaire</option>
              <option value="especes">💵 Paiement à la livraison</option>
            </select>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Récapitulatif de la commande</h2>

          {cart.map((item) => (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '0.5rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border-color)'
            }}>
              <span>{item.name} × {item.quantity}</span>
              <span style={{ fontWeight: 'bold' }}>
                {(parseFloat(item.price) * item.quantity).toFixed(2)} €
              </span>
            </div>
          ))}

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '1rem',
            fontSize: '1.25rem',
            fontWeight: 'bold'
          }}>
            <span>Total :</span>
            <span style={{ color: 'var(--primary-color)' }}>
              {getCartTotal().toFixed(2)} €
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', fontSize: '1.1rem' }}
          disabled={loading}
        >
          {loading ? 'Traitement en cours...' : '✅ Confirmer et payer'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/cart')}
          className="btn btn-secondary"
          style={{ width: '100%', marginTop: '0.5rem' }}
        >
          ← Retour au panier
        </button>
      </form>
    </div>
  );
};

export default Checkout;

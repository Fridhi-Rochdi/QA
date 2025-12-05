import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="container" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <div className="card" style={{ padding: '3rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛒 Votre panier est vide</h1>
          <p style={{ color: 'var(--secondary-color)', marginBottom: '2rem' }}>
            Ajoutez des produits pour commencer vos achats
          </p>
          <Link to="/products" className="btn btn-primary">
            Parcourir les produits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>🛒 Mon Panier</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Liste des produits */}
        <div>
          {cart.map((item) => (
            <div key={item.id} className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '100px',
                  height: '100px',
                  backgroundColor: '#e2e8f0',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}>
                  📦
                </div>

                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>
                    <Link to={`/products/${item.id}`}>{item.name}</Link>
                  </h3>
                  <p style={{ color: 'var(--secondary-color)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    {item.category}
                  </p>
                  <p style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                    {parseFloat(item.price).toFixed(2)} € × {item.quantity} = {(parseFloat(item.price) * item.quantity).toFixed(2)} €
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.75rem' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="btn btn-secondary"
                      style={{ padding: '0.25rem 0.75rem' }}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-danger"
                    style={{ fontSize: '0.875rem' }}
                  >
                    🗑️ Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="btn btn-danger"
            style={{ marginTop: '1rem' }}
          >
            Vider le panier
          </button>
        </div>

        {/* Résumé de la commande */}
        <div>
          <div className="card">
            <h2 style={{ marginBottom: '1.5rem' }}>Résumé</h2>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Sous-total :</span>
                <span>{getCartTotal().toFixed(2)} €</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Livraison :</span>
                <span>Gratuite</span>
              </div>
              <hr style={{ margin: '1rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                <span>Total :</span>
                <span style={{ color: 'var(--primary-color)' }}>{getCartTotal().toFixed(2)} €</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="btn btn-primary"
              style={{ width: '100%', textAlign: 'center', padding: '0.75rem', fontSize: '1.1rem' }}
            >
              Passer la commande
            </Link>

            <Link
              to="/products"
              className="btn btn-secondary"
              style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}
            >
              Continuer mes achats
            </Link>
          </div>

          <div className="card" style={{ marginTop: '1rem', backgroundColor: '#f0f9ff' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--dark-text)' }}>
              💳 Paiement sécurisé<br />
              🚚 Livraison rapide<br />
              ↩️ Retours gratuits sous 30 jours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

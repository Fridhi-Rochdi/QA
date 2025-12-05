import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { isClient } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data.product);
    } catch (err) {
      setError('Erreur lors du chargement du produit');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!isClient) {
      alert('Vous devez être connecté en tant que client pour ajouter au panier');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    alert(`${quantity} produit(s) ajouté(s) au panier !`);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ marginTop: '2rem' }}>
        <div className="alert alert-error">{error || 'Produit non trouvé'}</div>
        <Link to="/products" className="btn btn-secondary">Retour aux produits</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      <Link to="/products" className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Retour aux produits
      </Link>

      <div className="card">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Image du produit */}
          <div>
            <div style={{
              width: '100%',
              height: '400px',
              backgroundColor: product.image_url ? 'transparent' : '#e2e8f0',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              overflow: 'hidden'
            }}>
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '0.5rem'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '📦';
                  }}
                />
              ) : (
                '📦'
              )}
            </div>
          </div>

          {/* Détails du produit */}
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <span className="badge badge-info">{product.category}</span>
              {product.stock > 0 ? (
                <span className="badge badge-success">En stock ({product.stock})</span>
              ) : (
                <span className="badge badge-danger">Rupture de stock</span>
              )}
            </div>

            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', marginBottom: '1rem' }}>
              {parseFloat(product.price).toFixed(2)} €
            </p>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Description</h3>
              <p style={{ color: 'var(--secondary-color)', lineHeight: '1.6' }}>
                {product.description}
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Vendeur</h3>
              <p style={{ color: 'var(--secondary-color)' }}>
                {product.vendor?.firstName} {product.vendor?.lastName}
              </p>
            </div>

            {product.rating > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem' }}>Évaluation</h3>
                <p>⭐ {product.rating} / 5 ({product.reviewCount} avis)</p>
              </div>
            )}

            {isClient && product.stock > 0 && (
              <div>
                <div className="form-group" style={{ maxWidth: '150px', marginBottom: '1rem' }}>
                  <label className="form-label">Quantité</label>
                  <input
                    type="number"
                    className="form-input"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}
                >
                  🛒 Ajouter au panier
                </button>
              </div>
            )}

            {!isClient && (
              <p style={{ color: 'var(--secondary-color)', marginTop: '1rem' }}>
                <Link to="/login">Connectez-vous</Link> en tant que client pour acheter ce produit
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

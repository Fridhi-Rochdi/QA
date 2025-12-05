import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyProducts, deleteProduct } from '../services/productService';

// Icônes SVG
const PackageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

const TagIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const XCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="15" y1="9" x2="9" y2="15"/>
    <line x1="9" y1="9" x2="15" y2="15"/>
  </svg>
);

const VendorProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getMyProducts();
      setProducts(data.products);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      return;
    }

    try {
      await deleteProduct(id);
      alert('Produit supprimé avec succès');
      loadProducts();
    } catch (err) {
      alert('Erreur lors de la suppression du produit');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        padding: '60px 0 40px',
        marginBottom: '3rem'
      }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: 'white',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <PackageIcon />
                Mes Produits
              </h1>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '1.1rem',
                margin: 0
              }}>
                {products.length} produit{products.length > 1 ? 's' : ''} dans votre catalogue
              </p>
            </div>
            
            <Link 
              to="/vendor/products/new"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              }}
            >
              <PlusIcon />
              Ajouter un produit
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <XCircleIcon />
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '4rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ 
              fontSize: '5rem', 
              marginBottom: '1.5rem',
              color: '#cbd5e0'
            }}>
              <PackageIcon />
            </div>
            <h2 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '1rem' 
            }}>
              Aucun produit
            </h2>
            <p style={{ 
              color: '#718096',
              fontSize: '1.1rem',
              marginBottom: '2rem',
              maxWidth: '500px',
              margin: '0 auto 2rem'
            }}>
              Commencez à vendre en ajoutant votre premier produit à votre catalogue
            </p>
            <Link 
              to="/vendor/products/new"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
              }}
            >
              <PlusIcon />
              Ajouter mon premier produit
            </Link>
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            {products.map((product) => (
              <div 
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                }}
              >
                {/* Image Section */}
                <div style={{ 
                  background: product.image_url ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  height: '180px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {product.image_url ? (
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        e.target.parentElement.innerHTML += '<div style="color: white; font-size: 3.5rem; display: flex; align-items: center; justify-content: center; height: 100%;"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>';
                      }}
                    />
                  ) : (
                    <>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                      }}></div>
                      <div style={{ color: 'white', fontSize: '3.5rem', position: 'relative', zIndex: 1 }}>
                        <PackageIcon />
                      </div>
                    </>
                  )}
                  
                  {/* Status Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    display: 'flex',
                    gap: '8px'
                  }}>
                    {product.isActive ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(72, 187, 120, 0.95)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <CheckCircleIcon />
                        Actif
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(239, 68, 68, 0.95)',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <XCircleIcon />
                        Inactif
                      </div>
                    )}
                  </div>
                  
                  {/* Stock Badge */}
                  {product.stock <= 5 && product.stock > 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: 'rgba(255,193,7,0.95)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)'
                    }}>
                      Stock faible
                    </div>
                  )}
                  
                  {product.stock === 0 && (
                    <div style={{
                      position: 'absolute',
                      top: '15px',
                      left: '15px',
                      background: 'rgba(239,68,68,0.95)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)'
                    }}>
                      Rupture de stock
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                    color: '#667eea',
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    width: 'fit-content'
                  }}>
                    <TagIcon />
                    {product.category}
                  </div>
                  
                  {/* Product Name */}
                  <h3 style={{ 
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#2d3748',
                    marginBottom: '0.75rem',
                    lineHeight: '1.3'
                  }}>
                    {product.name}
                  </h3>
                  
                  {/* Description */}
                  <p style={{ 
                    color: '#718096',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    marginBottom: '1rem',
                    flex: 1
                  }}>
                    {product.description.substring(0, 80)}...
                  </p>
                  
                  {/* Price and Stock */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <DollarIcon />
                      <div style={{ 
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        {parseFloat(product.price).toFixed(2)} €
                      </div>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      color: product.stock > 10 ? '#38a169' : product.stock > 0 ? '#dd6b20' : '#e53e3e',
                      fontWeight: '600'
                    }}>
                      <PackageIcon />
                      Stock: {product.stock}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link
                      to={`/vendor/products/edit/${product.id}`}
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '0.75rem',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        border: 'none',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <EditIcon />
                      Modifier
                    </Link>
                    
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '12px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        background: 'white',
                        color: '#e53e3e',
                        border: '2px solid #e53e3e',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#e53e3e';
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = '#e53e3e';
                      }}
                    >
                      <TrashIcon />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;

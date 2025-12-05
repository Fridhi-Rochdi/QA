import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../services/productService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Icônes SVG
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const { addToCart } = useCart();
  const { isClient } = useAuth();

  useEffect(() => {
    loadProducts();
  }, [filters]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts(filters);
      setProducts(data.products);
    } catch (err) {
      setError('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert('Produit ajouté au panier !');
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
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: 'white',
            marginBottom: '0.5rem',
            textAlign: 'center'
          }}>
            Tous les produits
          </h1>
          <p style={{ 
            textAlign: 'center', 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '1.1rem' 
          }}>
            Découvrez notre large sélection de produits de qualité
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        {/* Filtres */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
          marginBottom: '2rem',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '1.5rem',
            color: '#2d3748'
          }}>
            <FilterIcon />
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '600' }}>Filtres de recherche</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label" style={{ 
                fontWeight: '600', 
                color: '#4a5568',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <SearchIcon />
                Rechercher
              </label>
              <input
                type="text"
                name="search"
                className="form-input"
                placeholder="Nom du produit..."
                value={filters.search}
                onChange={handleFilterChange}
                style={{
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ 
                fontWeight: '600', 
                color: '#4a5568',
                marginBottom: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <TagIcon />
                Catégorie
              </label>
              <select 
                name="category" 
                className="form-select" 
                value={filters.category} 
                onChange={handleFilterChange}
                style={{
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              >
                <option value="">Toutes les catégories</option>
                <option value="Électronique">Électronique</option>
                <option value="Vêtements">Vêtements</option>
                <option value="Maison">Maison</option>
                <option value="Sport">Sport</option>
                <option value="Livres">Livres</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ 
                fontWeight: '600', 
                color: '#4a5568',
                marginBottom: '0.5rem'
              }}>
                Prix minimum
              </label>
              <input
                type="number"
                name="minPrice"
                className="form-input"
                placeholder="0 €"
                value={filters.minPrice}
                onChange={handleFilterChange}
                style={{
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ 
                fontWeight: '600', 
                color: '#4a5568',
                marginBottom: '0.5rem'
              }}>
                Prix maximum
              </label>
              <input
                type="number"
                name="maxPrice"
                className="form-input"
                placeholder="10000 €"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                style={{
                  padding: '0.75rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        {products.length === 0 ? (
          <div style={{
            background: 'white',
            padding: '4rem 2rem',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>
              <PackageIcon />
            </div>
            <p style={{ fontSize: '1.2rem', color: '#718096' }}>Aucun produit trouvé</p>
          </div>
        ) : (
          <>
            <div style={{ 
              marginBottom: '1.5rem',
              color: '#4a5568',
              fontSize: '1rem',
              fontWeight: '600'
            }}>
              {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
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
                    cursor: 'pointer',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = '#667eea';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  <div style={{ 
                    background: product.image_url ? 'transparent' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    height: '200px',
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
                          e.target.parentElement.innerHTML += '<div style="color: white; font-size: 4rem; display: flex; align-items: center; justify-content: center; height: 100%;"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>';
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
                        <div style={{ color: 'white', fontSize: '4rem', position: 'relative', zIndex: 1 }}>
                          <PackageIcon />
                        </div>
                      </>
                    )}
                    
                    {product.stock <= 5 && product.stock > 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(255,193,7,0.95)',
                        color: 'white',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)'
                      }}>
                        Stock limité
                      </div>
                    )}
                    
                    {product.stock === 0 && (
                      <div style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        background: 'rgba(239,68,68,0.95)',
                        color: 'white',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        backdropFilter: 'blur(10px)'
                      }}>
                        Rupture de stock
                      </div>
                    )}
                  </div>
                  
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                      color: '#667eea',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      width: 'fit-content'
                    }}>
                      <TagIcon />
                      {product.category}
                    </div>
                    
                    <h3 style={{ 
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#2d3748',
                      marginBottom: '0.75rem',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>
                    
                    <p style={{ 
                      color: '#718096',
                      fontSize: '0.9rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      flex: 1
                    }}>
                      {product.description.substring(0, 100)}...
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.25rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e2e8f0'
                    }}>
                      <div>
                        <div style={{ 
                          fontSize: '1.75rem',
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
                    
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <Link 
                        to={`/products/${product.id}`} 
                        style={{ 
                          flex: 1,
                          textAlign: 'center',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          fontSize: '0.95rem',
                          background: 'white',
                          color: '#667eea',
                          border: '2px solid #667eea',
                          transition: 'all 0.3s ease',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = '#f7fafc';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'white';
                        }}
                      >
                        <EyeIcon />
                        Détails
                      </Link>
                      
                      {isClient && product.stock > 0 && (
                        <button
                          onClick={() => handleAddToCart(product)}
                          style={{ 
                            flex: 1,
                            padding: '0.75rem',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '0.95rem',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
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
                          <ShoppingCartIcon />
                          Ajouter
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;

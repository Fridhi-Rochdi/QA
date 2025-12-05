import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/products');
      setProducts(data);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      alert('Erreur lors du chargement des produits');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      await api.delete(`/admin/products/${id}`);
      alert('Produit supprimé avec succès');
      loadProducts();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/admin/products/${id}/status`, {
        disponible: !currentStatus
      });
      alert('Statut mis à jour');
      loadProducts();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = (product.nom || '').toLowerCase().includes(search.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || 
                         (statusFilter === 'disponible' && product.disponible) ||
                         (statusFilter === 'indisponible' && !product.disponible);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="container"><p>Chargement...</p></div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gestion des Produits</h1>
        <Link to="/admin" className="btn btn-secondary">
          ← Retour au Dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div className="form-group">
            <label>Rechercher</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Nom ou description du produit..."
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Statut</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-control"
            >
              <option value="">Tous</option>
              <option value="disponible">Disponible</option>
              <option value="indisponible">Indisponible</option>
            </select>
          </div>

          <button onClick={() => { setSearch(''); setStatusFilter(''); }} className="btn btn-secondary">
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
          <h3 style={{ margin: 0, color: '#0369a1' }}>{products.length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Total Produits</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#f0fdf4' }}>
          <h3 style={{ margin: 0, color: '#15803d' }}>
            {products.filter(p => p.disponible).length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Disponibles</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#fef2f2' }}>
          <h3 style={{ margin: 0, color: '#dc2626' }}>
            {products.filter(p => !p.disponible).length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Indisponibles</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#fefce8' }}>
          <h3 style={{ margin: 0, color: '#ca8a04' }}>
            {products.filter(p => p.stock < 10).length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Stock Faible</p>
        </div>
      </div>

      {/* Products Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Image</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Produit</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Vendeur</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Prix</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Stock</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Statut</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.nom}
                          style={{ 
                            width: '60px', 
                            height: '60px', 
                            objectFit: 'cover', 
                            borderRadius: '8px' 
                          }}
                        />
                      ) : (
                        <div style={{ 
                          width: '60px', 
                          height: '60px', 
                          background: '#f3f4f6', 
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9ca3af'
                        }}>
                          📦
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div>
                        <strong>{product.nom}</strong>
                        <p style={{ 
                          margin: '0.25rem 0 0 0', 
                          fontSize: '0.875rem', 
                          color: '#666',
                          maxWidth: '300px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {product.description}
                        </p>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {product.Vendeur ? (
                        <div>
                          <div>{product.Vendeur.nom} {product.Vendeur.prenom}</div>
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            {product.Vendeur.email}
                          </div>
                        </div>
                      ) : (
                        <span style={{ color: '#999' }}>N/A</span>
                      )}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <strong>{product.prix.toFixed(2)} DT</strong>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        background: product.stock < 10 ? '#fee2e2' : '#dcfce7',
                        color: product.stock < 10 ? '#dc2626' : '#16a34a'
                      }}>
                        {product.stock}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleToggleStatus(product.id, product.disponible)}
                        style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          border: 'none',
                          cursor: 'pointer',
                          background: product.disponible ? '#dcfce7' : '#fee2e2',
                          color: product.disponible ? '#16a34a' : '#dc2626'
                        }}
                      >
                        {product.disponible ? '✓ Disponible' : '✗ Indisponible'}
                      </button>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <Link 
                          to={`/products/${product.id}`}
                          className="btn btn-secondary"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        >
                          👁️ Voir
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="btn"
                          style={{ 
                            padding: '0.5rem 1rem', 
                            fontSize: '0.875rem',
                            background: '#dc2626',
                            color: 'white'
                          }}
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
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

export default AdminProducts;

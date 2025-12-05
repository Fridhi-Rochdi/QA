import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    activeVendors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/stats');
      setStats(data);
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container"><p>Chargement...</p></div>;
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Dashboard Administrateur</h1>
        <p style={{ color: '#666' }}>Bienvenue, {user?.nom} {user?.prenom}</p>
      </div>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
          <h3>Utilisateurs Total</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{stats.totalUsers}</p>
          <Link to="/admin/users" style={{ color: 'white', textDecoration: 'underline' }}>
            Voir tous →
          </Link>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
          <h3>Produits</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{stats.totalProducts}</p>
          <Link to="/admin/products" style={{ color: 'white', textDecoration: 'underline' }}>
            Gérer produits →
          </Link>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
          <h3>Commandes</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{stats.totalOrders}</p>
          <Link to="/admin/orders" style={{ color: 'white', textDecoration: 'underline' }}>
            Voir commandes →
          </Link>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', color: 'white' }}>
          <h3>Revenus Total</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>
            {stats.totalRevenue.toFixed(2)} DT
          </p>
          <span style={{ opacity: 0.9 }}>Tous les vendeurs</span>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', color: 'white' }}>
          <h3>Commandes en attente</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{stats.pendingOrders}</p>
          <Link to="/admin/orders?status=en_attente" style={{ color: 'white', textDecoration: 'underline' }}>
            Traiter →
          </Link>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)', color: 'white' }}>
          <h3>Vendeurs Actifs</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '1rem 0' }}>{stats.activeVendors}</p>
          <Link to="/admin/vendors" style={{ color: 'white', textDecoration: 'underline' }}>
            Voir vendeurs →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2>Actions Rapides</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <Link to="/admin/products" className="btn btn-primary">
            📦 Gérer Produits
          </Link>
          <Link to="/admin/users" className="btn btn-primary">
            👥 Gérer Utilisateurs
          </Link>
          <Link to="/admin/orders" className="btn btn-primary">
            📋 Gérer Commandes
          </Link>
          <Link to="/admin/vendors" className="btn btn-primary">
            🏪 Gérer Vendeurs
          </Link>
          <Link to="/admin/categories" className="btn btn-primary">
            📂 Gérer Catégories
          </Link>
          <Link to="/admin/reports" className="btn btn-primary">
            📊 Rapports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

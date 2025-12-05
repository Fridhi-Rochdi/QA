import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/admin/users');
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
      alert('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await api.delete(`/admin/users/${id}`);
      alert('Utilisateur supprimé avec succès');
      loadUsers();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  const handleChangeRole = async (id, newRole) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role: newRole });
      alert('Rôle mis à jour avec succès');
      loadUsers();
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du rôle');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.nom || '').toLowerCase().includes(search.toLowerCase()) ||
                         (user.prenom || '').toLowerCase().includes(search.toLowerCase()) ||
                         (user.email || '').toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div className="container"><p>Chargement...</p></div>;
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Gestion des Utilisateurs</h1>
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
              placeholder="Nom, prénom ou email..."
              className="form-control"
            />
          </div>
          
          <div className="form-group">
            <label>Rôle</label>
            <select 
              value={roleFilter} 
              onChange={(e) => setRoleFilter(e.target.value)}
              className="form-control"
            >
              <option value="">Tous</option>
              <option value="client">Client</option>
              <option value="vendeur">Vendeur</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button onClick={() => { setSearch(''); setRoleFilter(''); }} className="btn btn-secondary">
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
          <h3 style={{ margin: 0, color: '#0369a1' }}>{users.length}</h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Total Utilisateurs</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#fef3c7' }}>
          <h3 style={{ margin: 0, color: '#d97706' }}>
            {users.filter(u => u.role === 'client').length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Clients</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#ddd6fe' }}>
          <h3 style={{ margin: 0, color: '#7c3aed' }}>
            {users.filter(u => u.role === 'vendeur').length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Vendeurs</p>
        </div>
        <div className="card" style={{ textAlign: 'center', background: '#fee2e2' }}>
          <h3 style={{ margin: 0, color: '#dc2626' }}>
            {users.filter(u => u.role === 'admin').length}
          </h3>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>Admins</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Nom Complet</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>Téléphone</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Rôle</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Date Inscription</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                    Aucun utilisateur trouvé
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>
                      <strong>{user.nom} {user.prenom}</strong>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {user.email}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {user.telephone || <span style={{ color: '#999' }}>N/A</span>}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <select
                        value={user.role}
                        onChange={(e) => handleChangeRole(user.id, e.target.value)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '6px',
                          border: '1px solid #d1d5db',
                          fontSize: '0.875rem',
                          fontWeight: 'bold',
                          background: user.role === 'admin' ? '#fee2e2' : 
                                     user.role === 'vendeur' ? '#ddd6fe' : '#fef3c7',
                          color: user.role === 'admin' ? '#dc2626' : 
                                user.role === 'vendeur' ? '#7c3aed' : '#d97706'
                        }}
                      >
                        <option value="client">Client</option>
                        <option value="vendeur">Vendeur</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', color: '#666' }}>
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn"
                          style={{ 
                            padding: '0.5rem 1rem', 
                            fontSize: '0.875rem',
                            background: '#dc2626',
                            color: 'white'
                          }}
                          disabled={user.role === 'admin'}
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

export default AdminUsers;

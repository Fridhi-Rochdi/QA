import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// Icônes SVG
const UserIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const ShoppingCartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1"/>
    <circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
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
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
            }}>
              <UserIcon />
            </div>
            <div>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700', 
                color: 'white',
                marginBottom: '0.5rem',
                margin: 0
              }}>
                {user.firstName} {user.lastName}
              </h1>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '1.1rem',
                margin: 0
              }}>
                {user.role === 'client' && 'Client'}
                {user.role === 'vendeur' && 'Vendeur'}
                {user.role === 'admin' && 'Administrateur'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem', maxWidth: '1000px' }}>
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            padding: '2rem',
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(to right, rgba(102,126,234,0.05), rgba(118,75,162,0.05))'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2d3748'
            }}>
              Informations personnelles
            </h2>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{
                padding: '1.5rem',
                borderRadius: '15px',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8f9fa';
              }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#718096', 
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  <UserIcon />
                  Prénom
                </div>
                <p style={{ 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: '#2d3748',
                  margin: 0
                }}>
                  {user.firstName}
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '15px',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8f9fa';
              }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#718096', 
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  <UserIcon />
                  Nom
                </div>
                <p style={{ 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: '#2d3748',
                  margin: 0
                }}>
                  {user.lastName}
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '15px',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8f9fa';
              }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#718096', 
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  <MailIcon />
                  Email
                </div>
                <p style={{ 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: '#2d3748',
                  margin: 0,
                  wordBreak: 'break-all'
                }}>
                  {user.email}
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '15px',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8f9fa';
              }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#718096', 
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  <ShieldIcon />
                  Rôle
                </div>
                <div>
                  {user.role === 'client' && (
                    <span style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#3b82f6',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid #3b82f6'
                    }}>Client</span>
                  )}
                  {user.role === 'vendeur' && (
                    <span style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#10b981',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid #10b981'
                    }}>Vendeur</span>
                  )}
                  {user.role === 'admin' && (
                    <span style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#f59e0b',
                      background: 'rgba(245, 158, 11, 0.1)',
                      border: '1px solid #f59e0b'
                    }}>Administrateur</span>
                  )}
                </div>
              </div>

              {user.phone && (
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '15px',
                  background: '#f8f9fa',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8f9fa';
                }}
                >
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#718096', 
                    fontSize: '0.875rem',
                    marginBottom: '0.75rem',
                    fontWeight: '600'
                  }}>
                    <PhoneIcon />
                    Téléphone
                  </div>
                  <p style={{ 
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    color: '#2d3748',
                    margin: 0
                  }}>
                    {user.phone}
                  </p>
                </div>
              )}

              {user.address && (
                <div style={{
                  padding: '1.5rem',
                  borderRadius: '15px',
                  background: '#f8f9fa',
                  border: '1px solid #e2e8f0',
                  gridColumn: '1 / -1',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#667eea';
                  e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#f8f9fa';
                }}
                >
                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#718096', 
                    fontSize: '0.875rem',
                    marginBottom: '0.75rem',
                    fontWeight: '600'
                  }}>
                    <MapPinIcon />
                    Adresse
                  </div>
                  <p style={{ 
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    color: '#2d3748',
                    margin: 0
                  }}>
                    {user.address}
                  </p>
                </div>
              )}

              <div style={{
                padding: '1.5rem',
                borderRadius: '15px',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8f9fa';
              }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#718096', 
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  <CalendarIcon />
                  Compte créé le
                </div>
                <p style={{ 
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  color: '#2d3748',
                  margin: 0
                }}>
                  {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>

              <div style={{
                padding: '1.5rem',
                borderRadius: '15px',
                background: '#f8f9fa',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.background = 'rgba(102,126,234,0.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.background = '#f8f9fa';
              }}
              >
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#718096', 
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem',
                  fontWeight: '600'
                }}>
                  <ShieldIcon />
                  Statut du compte
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {user.isActive ? (
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#10b981',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid #10b981'
                    }}>Actif</span>
                  ) : (
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#ef4444',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #ef4444'
                    }}>Désactivé</span>
                  )}
                  {user.isVerified && (
                    <span style={{
                      display: 'inline-block',
                      padding: '6px 12px',
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: '#3b82f6',
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid #3b82f6'
                    }}>Vérifié</span>
                  )}
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid #e2e8f0',
              display: 'flex', 
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <button style={{
                flex: 1,
                minWidth: '200px',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                <EditIcon />
                Modifier le profil
              </button>
              <button style={{
                flex: 1,
                minWidth: '200px',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '1rem',
                background: 'white',
                color: '#667eea',
                border: '2px solid #667eea',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#f7fafc';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <LockIcon />
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>

        {/* Actions rapides selon le rôle */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ 
            padding: '2rem',
            borderBottom: '1px solid #e2e8f0',
            background: 'linear-gradient(to right, rgba(102,126,234,0.05), rgba(118,75,162,0.05))'
          }}>
            <h2 style={{ 
              margin: 0, 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#2d3748'
            }}>
              Actions rapides
            </h2>
          </div>

          <div style={{ padding: '2rem' }}>
            {user.role === 'client' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                <Link 
                  to="/orders"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '1.25rem 2rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <PackageIcon />
                  Mes commandes
                </Link>
                <Link 
                  to="/cart"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '1.25rem 2rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f7fafc';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <ShoppingCartIcon />
                  Mon panier
                </Link>
              </div>
            )}

            {user.role === 'vendeur' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
                <Link 
                  to="/vendor/products"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '1.25rem 2rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  <PackageIcon />
                  Mes produits
                </Link>
                <Link 
                  to="/vendor/sales"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '1.25rem 2rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    background: 'white',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#f7fafc';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <TrendingUpIcon />
                  Mes ventes
                </Link>
                <Link 
                  to="/vendor/products/new"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    padding: '1.25rem 2rem',
                    borderRadius: '15px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(16, 185, 129, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  <PlusIcon />
                  Nouveau produit
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

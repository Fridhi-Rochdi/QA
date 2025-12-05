import React, { useState, useEffect } from 'react';
import { getVendorSales } from '../services/orderService';

// Icônes SVG
const TrendingUpIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
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

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const VendorSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);
      const data = await getVendorSales();
      setSales(data.sales);
      
      // Calculer les statistiques
      const totalRevenue = data.sales.reduce((sum, sale) => sum + parseFloat(sale.totalPrice), 0);
      const pendingOrders = data.sales.filter(sale => 
        sale.order?.status === 'en_attente' || sale.order?.status === 'confirmee'
      ).length;

      setStats({
        totalSales: data.sales.length,
        totalRevenue,
        pendingOrders
      });
    } catch (err) {
      setError('Erreur lors du chargement des ventes');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      en_attente: { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', label: 'En attente' },
      confirmee: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Confirmée' },
      en_preparation: { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', label: 'En préparation' },
      expediee: { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', label: 'Expédiée' },
      livree: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Livrée' },
      annulee: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Annulée' }
    };
    const config = statusConfig[status] || statusConfig.en_attente;
    return (
      <span style={{
        display: 'inline-block',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.color}`
      }}>
        {config.label}
      </span>
    );
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
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <TrendingUpIcon />
            Mes Ventes
          </h1>
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            fontSize: '1.1rem',
            margin: 0
          }}>
            Suivez vos performances et gérez vos ventes
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '3rem' }}>
        {/* Statistiques */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem', 
          marginBottom: '3rem' 
        }}>
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              opacity: 0.1,
              borderRadius: '0 20px 0 100%'
            }}></div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <ShoppingBagIcon />
              </div>
              <div>
                <p style={{ 
                  color: '#718096', 
                  fontSize: '0.9rem',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Total des ventes
                </p>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  margin: '0.25rem 0 0',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stats.totalSales}
                </h2>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              opacity: 0.1,
              borderRadius: '0 20px 0 100%'
            }}></div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <DollarSignIcon />
              </div>
              <div>
                <p style={{ 
                  color: '#718096', 
                  fontSize: '0.9rem',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Revenu total
                </p>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  margin: '0.25rem 0 0',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stats.totalRevenue.toFixed(2)} €
                </h2>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '20px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
            border: '1px solid #e2e8f0',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.12)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
          }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '100px',
              height: '100px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              opacity: 0.1,
              borderRadius: '0 20px 0 100%'
            }}></div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              marginBottom: '1rem',
              position: 'relative',
              zIndex: 1
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '15px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <ClockIcon />
              </div>
              <div>
                <p style={{ 
                  color: '#718096', 
                  fontSize: '0.9rem',
                  margin: 0,
                  fontWeight: '500'
                }}>
                  Commandes en cours
                </p>
                <h2 style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  margin: '0.25rem 0 0',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  {stats.pendingOrders}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        {sales.length === 0 ? (
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
              <TrendingUpIcon />
            </div>
            <h2 style={{ 
              fontSize: '2rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '1rem' 
            }}>
              Aucune vente
            </h2>
            <p style={{ 
              color: '#718096',
              fontSize: '1.1rem',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              Vos ventes apparaîtront ici une fois que des clients auront acheté vos produits
            </p>
          </div>
        ) : (
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
                Historique des ventes
              </h2>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{
                    background: '#f8f9fa',
                    borderBottom: '2px solid #e2e8f0'
                  }}>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CalendarIcon />
                        Date
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <PackageIcon />
                        Produit
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <UserIcon />
                        Client
                      </div>
                    </th>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'center',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Quantité
                    </th>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Prix unit.
                    </th>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Total
                    </th>
                    <th style={{
                      padding: '1rem 1.5rem',
                      textAlign: 'left',
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      color: '#4a5568',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, index) => (
                    <tr 
                      key={sale.id}
                      style={{
                        borderBottom: '1px solid #e2e8f0',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#f8f9fa';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'white';
                      }}
                    >
                      <td style={{ 
                        padding: '1.25rem 1.5rem',
                        color: '#4a5568',
                        fontSize: '0.95rem'
                      }}>
                        {new Date(sale.createdAt).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1.5rem'
                      }}>
                        <strong style={{ 
                          color: '#2d3748',
                          fontSize: '1rem'
                        }}>
                          {sale.product?.name}
                        </strong>
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1.5rem',
                        color: '#4a5568',
                        fontSize: '0.95rem'
                      }}>
                        {sale.order?.client?.firstName} {sale.order?.client?.lastName}
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1.5rem',
                        textAlign: 'center'
                      }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, rgba(102,126,234,0.1) 0%, rgba(118,75,162,0.1) 100%)',
                          color: '#667eea',
                          fontWeight: '600',
                          fontSize: '0.9rem'
                        }}>
                          {sale.quantity}
                        </span>
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1.5rem',
                        color: '#4a5568',
                        fontSize: '0.95rem'
                      }}>
                        {parseFloat(sale.unitPrice).toFixed(2)} €
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1.5rem'
                      }}>
                        <strong style={{
                          fontSize: '1.1rem',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>
                          {parseFloat(sale.totalPrice).toFixed(2)} €
                        </strong>
                      </td>
                      <td style={{ 
                        padding: '1.25rem 1.5rem'
                      }}>
                        {getStatusBadge(sale.order?.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorSales;

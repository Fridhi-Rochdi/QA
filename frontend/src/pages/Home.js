import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Icônes SVG personnalisées
const ShoppingBagIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13"/>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const StoreIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
);

const HeadsetIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const PackageIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 1250, products: 8500, orders: 3200 });

  useEffect(() => {
    // Animation des statistiques
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStats({
        users: Math.floor(1250 * progress),
        products: Math.floor(8500 * progress),
        orders: Math.floor(3200 * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section avec gradient animé */}
      <section style={{
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)',
          opacity: 0.4
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto', 
            textAlign: 'center',
            color: 'white'
          }}>
            <h1 style={{ 
              fontSize: '3.5rem', 
              fontWeight: '800',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              Bienvenue sur <span style={{ 
                background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>BazaarNet</span>
            </h1>
            
            <p style={{ 
              fontSize: '1.5rem', 
              marginBottom: '3rem',
              opacity: 0.95,
              fontWeight: '300'
            }}>
              La marketplace moderne qui révolutionne le e-commerce
            </p>

            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '4rem'
            }}>
              <Link 
                to="/products" 
                style={{ 
                  padding: '1rem 3rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px'
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
                <ShoppingBagIcon />
                Explorer les produits
              </Link>
              
              {!user && (
                <Link 
                  to="/register" 
                  style={{ 
                    padding: '1rem 3rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '50px',
                    textDecoration: 'none',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#2c5364';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  <StoreIcon />
                  Devenir vendeur
                </Link>
              )}
            </div>

            {/* Stats en temps réel */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {[
                { label: 'Utilisateurs actifs', value: stats.users.toLocaleString(), IconComponent: UsersIcon },
                { label: 'Produits disponibles', value: stats.products.toLocaleString(), IconComponent: PackageIcon },
                { label: 'Commandes livrées', value: stats.orders.toLocaleString(), IconComponent: CheckCircleIcon }
              ].map((stat, index) => (
                <div key={index} style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                >
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', color: '#12c2e9' }}>
                    <stat.IconComponent />
                  </div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '80px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700',
              marginBottom: '1rem',
              color: '#2d3748'
            }}>
              Pourquoi choisir BazaarNet ?
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#718096', maxWidth: '600px', margin: '0 auto' }}>
              Une expérience de marketplace complète et sécurisée
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem'
          }}>
            {[
              {
                IconComponent: ShoppingBagIcon,
                title: 'Large sélection',
                description: 'Des milliers de produits de qualité, soigneusement sélectionnés par nos vendeurs vérifiés',
                gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: '#667eea'
              },
              {
                IconComponent: ShieldCheckIcon,
                title: 'Paiement sécurisé',
                description: 'Vos transactions sont protégées par un cryptage de niveau bancaire',
                gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: '#f5576c'
              },
              {
                IconComponent: TruckIcon,
                title: 'Livraison rapide',
                description: 'Recevez vos commandes en 24-48h partout en Tunisie',
                gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: '#00f2fe'
              },
              {
                IconComponent: StoreIcon,
                title: 'Espace vendeur',
                description: 'Interface moderne et intuitive pour gérer votre boutique en ligne',
                gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                color: '#38f9d7'
              },
              {
                IconComponent: ChartIcon,
                title: 'Analytics avancés',
                description: 'Suivez vos ventes en temps réel avec des statistiques détaillées',
                gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: '#fa709a'
              },
              {
                IconComponent: HeadsetIcon,
                title: 'Support 24/7',
                description: 'Notre équipe est disponible à tout moment pour vous aider',
                gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                color: '#30cfd0'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  padding: '2rem',
                  borderRadius: '20px',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid #f0f0f0'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = feature.color;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: feature.gradient,
                  opacity: 0.1,
                  borderRadius: '0 20px 0 100%'
                }}></div>
                
                <div style={{ 
                  marginBottom: '1.5rem',
                  color: feature.color,
                  display: 'flex',
                  justifyContent: 'flex-start'
                }}>
                  <feature.IconComponent />
                </div>
                
                <h3 style={{ 
                  fontSize: '1.4rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#2d3748'
                }}>
                  {feature.title}
                </h3>
                
                <p style={{ 
                  color: '#718096',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(102, 126, 234, 0.2) 0%, transparent 50%)',
          opacity: 0.5
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Prêt à commencer ?
          </h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '2.5rem', opacity: 0.9 }}>
            Rejoignez des milliers d'utilisateurs satisfaits sur BazaarNet
          </p>
          <Link 
            to="/register"
            style={{
              display: 'inline-block',
              padding: '1.2rem 3.5rem',
              fontSize: '1.2rem',
              fontWeight: '600',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              borderRadius: '50px',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease',
              border: 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.4)';
            }}
          >
            Créer un compte gratuitement →
          </Link>
        </div>
      </section>

      {/* Footer minimal */}
      <footer style={{
        padding: '3rem 0',
        background: '#1a202c',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <p style={{ opacity: 0.7, fontSize: '0.95rem', margin: 0 }}>
            © 2025 BazaarNet. Tous droits réservés. | Développé avec passion en Tunisie
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

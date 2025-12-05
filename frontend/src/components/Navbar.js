import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isClient, isVendor, isAdmin } = useAuth();
  const { getCartCount } = useCart();

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          🛒 BazaarNet
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/products">Produits</Link></li>

          {!isAuthenticated && (
            <>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/register">Inscription</Link></li>
            </>
          )}

          {isClient && (
            <>
              <li>
                <Link to="/cart">
                  Panier ({getCartCount()})
                </Link>
              </li>
              <li><Link to="/orders">Mes Commandes</Link></li>
            </>
          )}

          {isVendor && (
            <>
              <li><Link to="/vendor/products">Mes Produits</Link></li>
              <li><Link to="/vendor/sales">Mes Ventes</Link></li>
            </>
          )}

          {isAdmin && (
            <li><Link to="/admin">Administration</Link></li>
          )}

          {isAuthenticated && (
            <>
              <li><Link to="/profile">Profil ({user?.firstName})</Link></li>
              <li>
                <button onClick={logout} className="btn btn-secondary">
                  Déconnexion
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

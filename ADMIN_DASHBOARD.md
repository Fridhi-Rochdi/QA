# Dashboard Admin - BazaarNet

## 🎯 Fonctionnalités

Le dashboard administrateur de BazaarNet offre un contrôle complet sur la plateforme :

### 📊 Dashboard Principal
- **Statistiques en temps réel**
  - Nombre total d'utilisateurs
  - Nombre total de produits
  - Nombre total de commandes
  - Revenus totaux
  - Commandes en attente
  - Vendeurs actifs

### 📦 Gestion des Produits
- Visualiser tous les produits de la plateforme
- Filtrer par nom, description et statut (disponible/indisponible)
- Activer/désactiver la disponibilité des produits
- Supprimer des produits
- Voir les statistiques des produits (stock faible, disponibles, etc.)
- Voir les détails des vendeurs pour chaque produit

### 👥 Gestion des Utilisateurs
- Lister tous les utilisateurs (clients, vendeurs, admins)
- Filtrer par nom, prénom, email ou rôle
- Changer le rôle d'un utilisateur (client, vendeur, admin)
- Supprimer des utilisateurs (sauf les admins)
- Voir les statistiques des utilisateurs par rôle
- Voir la date d'inscription de chaque utilisateur

### 📋 Gestion des Commandes
- Voir toutes les commandes de la plateforme
- Filtrer par statut de commande et statut de paiement
- Mettre à jour le statut des commandes (en attente, confirmée, en cours, livrée, annulée)
- Mettre à jour le statut de paiement (en attente, payée, échouée)
- Voir les détails des clients pour chaque commande
- Statistiques en temps réel (commandes en attente, livrées, revenus)

## 🔐 Connexion Admin

### Identifiants par défaut :
```
Email: admin@bazaarnet.com
Mot de passe: admin123
```

### Comment se connecter :
1. Démarrer le frontend : `http://localhost:3000`
2. Cliquer sur "Connexion" dans le menu
3. Entrer les identifiants admin
4. Cliquer sur le lien "🔧 Admin" dans la barre de navigation

## 🚀 Accès aux pages

Une fois connecté en tant qu'admin, vous aurez accès à :

- **Dashboard** : `/admin` - Vue d'ensemble avec statistiques
- **Produits** : `/admin/products` - Gestion complète des produits
- **Utilisateurs** : `/admin/users` - Gestion des utilisateurs
- **Commandes** : `/admin/orders` - Gestion des commandes

## 🎨 Interface

L'interface admin utilise :
- **Cartes colorées** pour les statistiques (gradients modernes)
- **Tableaux responsives** pour la gestion des données
- **Filtres avancés** pour rechercher et trier
- **Actions en temps réel** (mise à jour de statut, suppression)
- **Design cohérent** avec le reste de l'application

## 📱 Navigation Rapide

Le dashboard principal offre des **actions rapides** vers :
- 📦 Gérer Produits
- 👥 Gérer Utilisateurs
- 📋 Gérer Commandes
- 🏪 Gérer Vendeurs
- 📂 Gérer Catégories
- 📊 Rapports

## 🔒 Sécurité

- Toutes les routes admin sont protégées par authentification
- Seuls les utilisateurs avec le rôle `admin` peuvent accéder
- Les JWT tokens sont validés côté backend
- Les admins ne peuvent pas être supprimés via l'interface

## 🛠️ API Backend

Les routes API admin sont disponibles sous `/api/admin` :

### Statistiques
- `GET /api/admin/stats` - Récupérer les statistiques du dashboard

### Produits
- `GET /api/admin/products` - Liste tous les produits
- `DELETE /api/admin/products/:id` - Supprimer un produit
- `PATCH /api/admin/products/:id/status` - Changer le statut

### Utilisateurs
- `GET /api/admin/users` - Liste tous les utilisateurs
- `DELETE /api/admin/users/:id` - Supprimer un utilisateur
- `PATCH /api/admin/users/:id/role` - Changer le rôle

### Commandes
- `GET /api/admin/orders` - Liste toutes les commandes
- `GET /api/admin/orders/:id` - Détails d'une commande
- `PATCH /api/admin/orders/:id/status` - Mettre à jour le statut
- `PATCH /api/admin/orders/:id/payment` - Mettre à jour le paiement

## 💡 Utilisation

### Exemple : Changer le rôle d'un utilisateur
1. Aller sur `/admin/users`
2. Trouver l'utilisateur dans la liste
3. Utiliser le menu déroulant dans la colonne "Rôle"
4. Sélectionner le nouveau rôle (client, vendeur, admin)
5. Le changement est automatique !

### Exemple : Gérer un produit
1. Aller sur `/admin/products`
2. Utiliser les filtres pour trouver le produit
3. Cliquer sur le badge "Disponible/Indisponible" pour changer le statut
4. Utiliser le bouton "Supprimer" si nécessaire
5. Cliquer sur "Voir" pour voir les détails du produit

### Exemple : Traiter une commande
1. Aller sur `/admin/orders`
2. Filtrer par statut si nécessaire
3. Utiliser les menus déroulants pour changer :
   - Le statut de la commande
   - Le statut du paiement
4. Cliquer sur "Détails" pour voir plus d'informations

## 📈 Améliorations Futures

- Rapports et analytics avancés
- Export de données (CSV, PDF)
- Gestion des catégories
- Système de notifications
- Logs d'activité admin
- Dashboard de métriques en temps réel
- Gestion des promotions et réductions
- Système de modération des avis clients

## 🎯 Notes Importantes

- Le dashboard est optimisé pour les écrans desktop et tablettes
- Les actions de suppression demandent une confirmation
- Les changements sont appliqués immédiatement
- Les statistiques se mettent à jour à chaque visite de la page
- Le lien "Admin" apparaît en rouge dans la navbar pour les admins

---

**Développé avec** ❤️ **pour BazaarNet**

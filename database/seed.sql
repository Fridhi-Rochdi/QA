-- Données de test pour BazaarNet
-- Les mots de passe seront hashés par l'application, mais pour info: tous utilisent "Password123!"

-- Note: Les ID UUID seront générés automatiquement par PostgreSQL

-- Insertion des utilisateurs de test
-- Admin
INSERT INTO "users" ("email", "password", "firstName", "lastName", "role", "phone", "address", "isActive", "isVerified")
VALUES 
  ('admin@bazaarnet.com', '$2b$10$YourHashedPasswordHere', 'Admin', 'BazaarNet', 'admin', '+33123456789', '1 Rue de la République, 75001 Paris', true, true);

-- Vendeurs
INSERT INTO "users" ("email", "password", "firstName", "lastName", "role", "phone", "address", "isActive", "isVerified")
VALUES 
  ('vendeur1@bazaarnet.com', '$2b$10$YourHashedPasswordHere', 'Marie', 'Dupont', 'vendeur', '+33134567890', '10 Avenue des Champs, 75008 Paris', true, true),
  ('vendeur2@bazaarnet.com', '$2b$10$YourHashedPasswordHere', 'Pierre', 'Martin', 'vendeur', '+33145678901', '25 Boulevard Voltaire, 75011 Paris', true, true),
  ('vendeur3@bazaarnet.com', '$2b$10$YourHashedPasswordHere', 'Sophie', 'Bernard', 'vendeur', '+33156789012', '5 Rue du Commerce, 75015 Paris', true, true);

-- Clients
INSERT INTO "users" ("email", "password", "firstName", "lastName", "role", "phone", "address", "isActive", "isVerified")
VALUES 
  ('client1@email.com', '$2b$10$YourHashedPasswordHere', 'Jean', 'Leroy', 'client', '+33167890123', '15 Rue de la Paix, 75002 Paris', true, true),
  ('client2@email.com', '$2b$10$YourHashedPasswordHere', 'Claire', 'Moreau', 'client', '+33178901234', '30 Avenue Montaigne, 75008 Paris', true, true),
  ('client3@email.com', '$2b$10$YourHashedPasswordHere', 'Thomas', 'Simon', 'client', '+33189012345', '8 Rue Saint-Honoré, 75001 Paris', true, true);

-- Note importante pour les tests:
-- Vous devrez créer ces utilisateurs via l'API /api/auth/register pour que les mots de passe soient correctement hashés
-- Ou mettre à jour ce fichier avec des hashes bcrypt réels

-- Exemples de commandes pour créer les utilisateurs via l'API:
/*
POST http://localhost:5000/api/auth/register
{
  "email": "admin@bazaarnet.com",
  "password": "Password123!",
  "firstName": "Admin",
  "lastName": "BazaarNet",
  "role": "admin",
  "phone": "+33123456789",
  "address": "1 Rue de la République, 75001 Paris"
}
*/

-- Les produits, commandes et order_items seront créés via l'API après l'inscription des utilisateurs

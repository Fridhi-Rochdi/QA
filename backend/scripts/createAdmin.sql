-- Créer un utilisateur admin
-- Mot de passe: admin123 (haché avec bcrypt)
INSERT INTO users (
  id, 
  email, 
  password, 
  "firstName", 
  "lastName", 
  role, 
  phone, 
  address, 
  "isActive", 
  "isVerified", 
  "createdAt", 
  "updatedAt"
) 
VALUES (
  gen_random_uuid(), 
  'admin@bazaarnet.com', 
  '$2b$10$K7YlH8TZk5QxYXjN5zK0KeD5TxYkP.PqL5mZ8ZQxYXjN5zK0KeD5T', 
  'Admin', 
  'BazaarNet', 
  'admin', 
  '71234567', 
  'Tunis, Tunisia', 
  true, 
  true, 
  NOW(), 
  NOW()
) 
ON CONFLICT (email) DO UPDATE SET
  password = EXCLUDED.password,
  "firstName" = EXCLUDED."firstName",
  "lastName" = EXCLUDED."lastName",
  role = 'admin';

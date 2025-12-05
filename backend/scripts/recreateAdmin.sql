-- Supprimer l'ancien admin et en créer un nouveau avec mot de passe correct
DELETE FROM users WHERE email = 'admin@bazaarnet.com';

-- Le mot de passe sera 'admin123'
-- Hash bcrypt généré: $2b$10$gm03nAcNnlRy0LoohLFG2..1WeC57DQjTIgS8jchTlZBhsqirf9wi
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
  '$2b$10$gm03nAcNnlRy0LoohLFG2..1WeC57DQjTIgS8jchTlZBhsqirf9wi', 
  'Admin', 
  'BazaarNet', 
  'admin', 
  '71234567', 
  'Tunis, Tunisia', 
  true, 
  true, 
  NOW(), 
  NOW()
);

-- Vérifier la création
SELECT email, role, "firstName", "lastName" FROM users WHERE email = 'admin@bazaarnet.com';

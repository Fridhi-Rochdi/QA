-- BazaarNet Database Schema
-- PostgreSQL Database

-- Suppression des tables existantes (si nécessaire)
DROP TABLE IF EXISTS "order_items" CASCADE;
DROP TABLE IF EXISTS "orders" CASCADE;
DROP TABLE IF EXISTS "products" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;

-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs
CREATE TABLE "users" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "email" VARCHAR(255) NOT NULL UNIQUE,
  "password" VARCHAR(255) NOT NULL,
  "firstName" VARCHAR(255) NOT NULL,
  "lastName" VARCHAR(255) NOT NULL,
  "role" VARCHAR(50) NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'vendeur', 'admin')),
  "phone" VARCHAR(50),
  "address" TEXT,
  "isActive" BOOLEAN DEFAULT TRUE,
  "isVerified" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des produits
CREATE TABLE "products" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" VARCHAR(255) NOT NULL,
  "description" TEXT NOT NULL,
  "price" DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  "stock" INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  "category" VARCHAR(100) NOT NULL,
  "images" TEXT[],
  "vendorId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "isActive" BOOLEAN DEFAULT TRUE,
  "rating" DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  "reviewCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE "orders" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "orderNumber" VARCHAR(100) NOT NULL UNIQUE,
  "clientId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "status" VARCHAR(50) NOT NULL DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee')),
  "totalAmount" DECIMAL(10, 2) NOT NULL,
  "shippingAddress" TEXT NOT NULL,
  "paymentMethod" VARCHAR(100) NOT NULL,
  "paymentStatus" VARCHAR(50) NOT NULL DEFAULT 'en_attente' CHECK ("paymentStatus" IN ('en_attente', 'payee', 'echouee', 'remboursee')),
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des items de commande
CREATE TABLE "order_items" (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "orderId" UUID NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
  "productId" UUID NOT NULL REFERENCES "products"("id") ON DELETE CASCADE,
  "vendorId" UUID NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "quantity" INTEGER NOT NULL CHECK (quantity >= 1),
  "unitPrice" DECIMAL(10, 2) NOT NULL,
  "totalPrice" DECIMAL(10, 2) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX idx_products_vendor ON "products"("vendorId");
CREATE INDEX idx_products_category ON "products"("category");
CREATE INDEX idx_products_active ON "products"("isActive");
CREATE INDEX idx_orders_client ON "orders"("clientId");
CREATE INDEX idx_orders_status ON "orders"("status");
CREATE INDEX idx_order_items_order ON "order_items"("orderId");
CREATE INDEX idx_order_items_vendor ON "order_items"("vendorId");

-- Fonction pour mettre à jour automatiquement updatedAt
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour mettre à jour updatedAt
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON "products"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON "orders"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_order_items_updated_at BEFORE UPDATE ON "order_items"
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../src/models');
const User = db.User;
const sequelize = db.sequelize;

const createAdminUser = async () => {
  try {
    // Test de connexion
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie');

    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ where: { role: 'admin' } });
    
    if (existingAdmin) {
      console.log('⚠️  Un administrateur existe déjà:', existingAdmin.email);
      console.log('Voulez-vous le supprimer et en créer un nouveau ? (Arrêtez le script si non)');
      await existingAdmin.destroy();
      console.log('✅ Ancien admin supprimé');
    }

    // Créer un nouvel admin
    const adminData = {
      nom: 'Admin',
      prenom: 'BazaarNet',
      email: 'admin@bazaarnet.com',
      motDePasse: 'admin123',
      telephone: '71234567',
      adresse: 'Tunis, Tunisie',
      role: 'admin'
    };

    const admin = await User.create(adminData);
    
    console.log('\n✅ Administrateur créé avec succès !');
    console.log('\n📧 Email:', admin.email);
    console.log('🔑 Mot de passe: admin123');
    console.log('👤 Rôle:', admin.role);
    console.log('\n🌐 Connectez-vous sur: http://localhost:3000/login');
    console.log('🔧 Accédez au dashboard admin: http://localhost:3000/admin\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
};

createAdminUser();

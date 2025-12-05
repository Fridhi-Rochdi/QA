const axios = require('axios');

const testAdminLogin = async () => {
  try {
    console.log('🔄 Test de connexion admin...\n');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@bazaarnet.com',
      password: 'admin123'
    });

    console.log('✅ Connexion réussie !');
    console.log('\n📧 Email:', response.data.user.email);
    console.log('👤 Nom:', response.data.user.firstName, response.data.user.lastName);
    console.log('🔑 Rôle:', response.data.user.role);
    console.log('🎫 Token:', response.data.token.substring(0, 50) + '...');
    console.log('\n✨ Vous pouvez maintenant vous connecter avec ces identifiants !');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Message:', error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

testAdminLogin();

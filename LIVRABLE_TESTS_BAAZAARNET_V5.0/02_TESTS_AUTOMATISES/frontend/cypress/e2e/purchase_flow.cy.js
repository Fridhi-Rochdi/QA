describe('Parcours Achat Client - BazaarNet', () => {
    
    // Fixture : Donnees de test
    const testUser = {
        email: 'client@bazaarnet.com',
        password: 'SecurePassword123'
    };

    beforeEach(() => {
        // 1. Visiter la page de login avant chaque test
        cy.visit('/login');
        
        // 2. Remplir le formulaire de connexion
        cy.get('input[name="email"]').type(testUser.email);
        cy.get('input[name="password"]').type(testUser.password);
        cy.get('button[type="submit"]').click();

        // 3. Verifier la redirection vers le Dashboard
        cy.url().should('include', '/dashboard');
        cy.contains(`Bienvenue, ${testUser.email}`).should('be.visible');
    });

    it('Scenario Nominal : Achat d\'un produit', () => {
        // Etape 1 : Navigation vers le catalogue
        cy.get('nav').contains('Catalogue').click();
        cy.url().should('include', '/products');

        // Etape 2 : Selection d'un produit (Premier de la liste)
        cy.get('.product-card').first().within(() => {
            cy.get('.product-title').invoke('text').as('productName');
            cy.get('button.add-to-cart').click();
        });

        // Verification notification Toast
        cy.get('.toast-success').should('contain', 'Produit ajoute au panier');

        // Etape 3 : Verification du Panier
        cy.get('#cart-icon-badge').should('contain', '1');
        cy.get('nav').contains('Panier').click();
        
        // Assertion : Le produit est bien dans le panier
        cy.get('@productName').then((name) => {
            cy.get('.cart-item').should('contain', name);
        });

        // Etape 4 : Validation de la commande
        cy.contains('Passer la commande').click();
        
        // Formulaire de livraison
        cy.get('input[name="address"]').type('123 Rue du Commerce, Paris');
        cy.get('input[name="city"]').type('Paris');
        cy.get('input[name="zipcode"]').type('75001');
        
        // Simulation Paiement (Mock)
        cy.get('button#confirm-order').click();

        // Etape 5 : Verification Finale
        cy.url().should('include', '/order-confirmation');
        cy.get('.order-success-message')
          .should('contain', 'Merci pour votre commande !');
        
        // Verification que le panier est vide
        cy.get('#cart-icon-badge').should('not.exist');
    });
});

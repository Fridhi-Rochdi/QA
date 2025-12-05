describe('SCENARIO COMPLET : Parcours Utilisateur & Admin', () => {
    
    const url = 'test_page.html';

    it('Devrait exécuter le scénario complet de bout en bout', () => {
        // 1. Visite du site
        cy.visit(url);
        cy.contains('BazaarNet').should('be.visible');
        cy.wait(1000);

        // ------------------------------------------------
        // PHASE 1 : INSCRIPTION & CONNEXION CLIENT
        // ------------------------------------------------
        cy.log('--- PHASE 1 : INSCRIPTION ---');
        cy.get('#nav-register').click();
        cy.get('#reg-name').type('Jean Dupont');
        cy.wait(500);
        cy.get('#reg-email').type('client@test.com');
        cy.wait(500);
        cy.get('#reg-pass').type('Password123!');
        cy.wait(500);
        cy.get('#btn-register').click();
        cy.contains('Compte créé avec succès').should('be.visible');
        cy.wait(1000);

        cy.log('--- PHASE 2 : CONNEXION ---');
        cy.get('#login-email').type('client@test.com');
        cy.wait(500);
        cy.get('#login-pass').type('Password123!');
        cy.wait(500);
        cy.get('#btn-login').click();
        cy.contains('Connexion réussie').should('be.visible');
        cy.wait(1500);

        // ------------------------------------------------
        // PHASE 3 : ACHAT (PRODUITS & PANIER)
        // ------------------------------------------------
        cy.log('--- PHASE 3 : SHOPPING ---');
        cy.contains('Nos Produits').should('be.visible');
        
        // Ajout iPhone
        cy.contains('iPhone 15 Pro').parent().find('button').click();
        cy.wait(800);
        
        // Ajout Casque
        cy.contains('Sony WH-1000XM5').parent().find('button').click();
        cy.wait(800);

        // Voir Panier
        cy.contains('Panier (2)').click();
        cy.wait(1000);
        cy.contains('Mon Panier').should('be.visible');
        cy.contains('iPhone 15 Pro').should('be.visible');
        cy.contains('Total: 1348 €').should('be.visible');
        cy.wait(1000);

        // Checkout
        cy.get('#btn-checkout').click();
        cy.contains('Commande validée').should('be.visible');
        cy.wait(2000);

        // Déconnexion
        cy.get('#nav-logout').click();
        cy.contains('Connexion').should('be.visible');
        cy.wait(1000);

        // ------------------------------------------------
        // PHASE 4 : ADMINISTRATION
        // ------------------------------------------------
        cy.log('--- PHASE 4 : ADMIN ---');
        cy.get('#login-email').clear().type('admin@test.com');
        cy.wait(500);
        cy.get('#login-pass').type('AdminPass!');
        cy.wait(500);
        cy.get('#btn-login').click();
        
        cy.contains('Dashboard Administrateur').should('be.visible');
        cy.wait(1500);

        // Bannir un utilisateur
        cy.contains('Jean Dupont').parent().find('#btn-ban-1').click();
        cy.contains('Utilisateur banni').should('be.visible');
        cy.contains('Banni').should('have.css', 'color', 'rgb(255, 0, 0)'); // Vérifie la couleur rouge
        cy.wait(2000);

        cy.log('--- FIN DU SCENARIO ---');
    });
});

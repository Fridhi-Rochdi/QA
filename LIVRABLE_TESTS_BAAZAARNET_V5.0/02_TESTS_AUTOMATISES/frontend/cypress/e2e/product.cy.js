describe('Module Gestion Produits (UI Vendeur)', () => {
    
    beforeEach(() => {
        cy.login('vendeur@bazaarnet.com', 'SellerPass123');
        cy.visit('/dashboard/products');
    });

    it('TC-PROD-01: Création Produit Standard', () => {
        cy.contains('Ajouter un produit').click();
        cy.get('input[name="name"]').type('Nouveau Produit');
        cy.get('input[name="price"]').type('50');
        cy.get('input[name="stock"]').type('100');
        cy.get('textarea[name="description"]').type('Description test');
        cy.get('button[type="submit"]').click();
        
        cy.contains('Produit créé avec succès').should('be.visible');
        cy.contains('Nouveau Produit').should('be.visible');
    });

    it('TC-PROD-02: Prix Négatif', () => {
        cy.contains('Ajouter un produit').click();
        cy.get('input[name="name"]').type('Produit Erreur');
        cy.get('input[name="price"]').type('-10');
        cy.get('button[type="submit"]').click();
        
        cy.contains('Le prix doit être positif').should('be.visible');
    });

    it('TC-PROD-07: Editer Produit', () => {
        cy.get('.product-item').first().find('button.edit-btn').click();
        cy.get('input[name="stock"]').clear().type('200');
        cy.get('button[type="submit"]').click();
        
        cy.contains('Mise à jour réussie').should('be.visible');
    });
});

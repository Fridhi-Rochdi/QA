describe('Module Panier (UI)', () => {
    
    beforeEach(() => {
        cy.login('client@bazaarnet.com', 'SecurePassword123');
        cy.visit('/products');
    });

    it('TC-ORD-01: Ajout au panier', () => {
        cy.get('.product-card').first().find('button.add-to-cart').click();
        cy.get('#cart-badge').should('contain', '1');
    });

    it('TC-ORD-03: Modifier Quantité', () => {
        // Ajouter au panier
        cy.get('.product-card').first().find('button.add-to-cart').click();
        cy.visit('/cart');
        
        // Changer qté
        cy.get('input.qty-input').clear().type('3');
        cy.get('.cart-total').should('contain', '300'); // Supposant prix 100
    });

    it('TC-ORD-04: Retirer du panier', () => {
        cy.get('.product-card').first().find('button.add-to-cart').click();
        cy.visit('/cart');
        cy.get('button.remove-item').click();
        cy.contains('Votre panier est vide').should('be.visible');
    });
});

describe('Module Administration (UI)', () => {
    
    beforeEach(() => {
        // Commande custom login admin
        cy.login('admin@bazaarnet.com', 'AdminPass123'); 
        cy.visit('/admin/dashboard');
    });

    it('TC-ADM-01: Accès Dashboard', () => {
        cy.contains('Tableau de Bord Administrateur').should('be.visible');
    });

    it('TC-ADM-03: Bannir Utilisateur', () => {
        cy.visit('/admin/users');
        cy.get('tr').contains('BadUser').parent().find('button.ban-btn').click();
        cy.contains('Utilisateur banni').should('be.visible');
    });

    it('TC-ADM-04: Supprimer Produit', () => {
        cy.visit('/admin/products');
        cy.get('tr').first().find('button.delete-btn').click();
        cy.on('window:confirm', () => true); // Accepter la popup
        cy.contains('Produit supprimé').should('be.visible');
    });
});

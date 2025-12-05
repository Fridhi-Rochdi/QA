describe('Module Authentification (UI)', () => {
    
    beforeEach(() => {
        cy.visit('/login');
    });

    it('TC-AUTH-01: Inscription Client Valide', () => {
        cy.visit('/register');
        cy.get('input[name="username"]').type('NewClient');
        cy.get('input[name="email"]').type(`newclient${Date.now()}@test.com`);
        cy.get('input[name="password"]').type('SecurePass123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
        cy.contains('Inscription réussie').should('be.visible');
    });

    it('TC-AUTH-04: Validation Champs Vides', () => {
        cy.visit('/register');
        cy.get('button[type="submit"]').click();
        cy.contains('Champs obligatoires').should('be.visible');
    });

    it('TC-AUTH-06: Login Succès', () => {
        cy.get('input[name="email"]').type('client@bazaarnet.com');
        cy.get('input[name="password"]').type('SecurePassword123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
    });

    it('TC-AUTH-07: Login Echec', () => {
        cy.get('input[name="email"]').type('client@bazaarnet.com');
        cy.get('input[name="password"]').type('WrongPass');
        cy.get('button[type="submit"]').click();
        cy.contains('Identifiants invalides').should('be.visible');
    });

    it('TC-AUTH-09: Logout', () => {
        // Login d'abord
        cy.login('client@bazaarnet.com', 'SecurePassword123');
        cy.get('button#logout').click();
        cy.url().should('include', '/');
        cy.get('nav').should('contain', 'Connexion');
    });
});

const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');

// Connection handled in setup.js

// Nettoyage apres chaque test
afterEach(async () => {
    await User.deleteMany({});
});

describe('MODULE AUTHENTIFICATION (TC-AUTH)', () => {
    const validUser = { username: "TestUser", email: "test@example.com", password: "Password123!" };

    // TC-AUTH-01 : Inscription Client Valide
    it('TC-AUTH-01: Devrait inscrire un utilisateur valide (201)', async () => {
        const res = await request(app).post('/api/auth/register').send(validUser);
        expect(res.statusCode).toEqual(201);
    });

    // TC-AUTH-02 : Inscription Email Existant
    it('TC-AUTH-02: Devrait refuser un email existant (400)', async () => {
        await User.create(validUser);
        const res = await request(app).post('/api/auth/register').send(validUser);
        expect(res.statusCode).toEqual(400);
    });

    // TC-AUTH-03 : Validation Mot de Passe Trop Court
    it('TC-AUTH-03: Devrait refuser un mot de passe trop court (400)', async () => {
        const shortPassUser = { ...validUser, password: "123" };
        const res = await request(app).post('/api/auth/register').send(shortPassUser);
        expect(res.statusCode).toEqual(400);
    });

    // TC-AUTH-04 : Champs vides
    it('TC-AUTH-04: Devrait refuser des champs vides (400)', async () => {
        const res = await request(app).post('/api/auth/register').send({});
        expect(res.statusCode).toEqual(400);
    });

    // TC-AUTH-05 : Format email invalide
    it('TC-AUTH-05: Devrait refuser un email invalide (400)', async () => {
        const invalidEmailUser = { ...validUser, email: "test.com" }; // Pas de @
        const res = await request(app).post('/api/auth/register').send(invalidEmailUser);
        expect(res.statusCode).toEqual(400);
    });

    // TC-AUTH-06 : Login Succès
    it('TC-AUTH-06: Devrait connecter un utilisateur valide (200)', async () => {
        await request(app).post('/api/auth/register').send(validUser);
        const res = await request(app).post('/api/auth/login').send({ email: validUser.email, password: validUser.password });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    // TC-AUTH-07 : Login Echec (Mauvais MDP)
    it('TC-AUTH-07: Devrait refuser un mauvais mot de passe (401)', async () => {
        await request(app).post('/api/auth/register').send(validUser);
        const res = await request(app).post('/api/auth/login').send({ email: validUser.email, password: "WrongPassword" });
        expect(res.statusCode).toEqual(401);
    });

    // TC-AUTH-08 : Login Banni
    it('TC-AUTH-08: Devrait refuser la connexion d\'un utilisateur banni (403)', async () => {
        const user = await User.create({ ...validUser, isBanned: true });
        const res = await request(app).post('/api/auth/login').send({ email: validUser.email, password: validUser.password });
        expect(res.statusCode).toEqual(403);
    });

    // TC-AUTH-09 : Logout (Testé via invalidation token ou coté client, ici simulation API)
    it('TC-AUTH-09: Devrait permettre la déconnexion (200)', async () => {
        // Note: En JWT stateless, le logout est souvent client-side, mais on peut avoir une route de blacklist
        const res = await request(app).post('/api/auth/logout');
        expect(res.statusCode).toEqual(200);
    });

    // TC-AUTH-10 : Mot de passe oublié
    it('TC-AUTH-10: Devrait initier la procédure de reset password (200)', async () => {
        await User.create(validUser);
        const res = await request(app).post('/api/auth/forgot-password').send({ email: validUser.email });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toContain('Email sent');
    });
});

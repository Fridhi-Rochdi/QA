const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const User = require('../../models/User');

let adminToken;
let clientToken;

beforeAll(async () => {
    // Connection handled in setup.js
    await User.deleteMany({}); // Ensure clean state
    
    // Setup Admin
    await request(app).post('/api/auth/register').send({
        username: "Admin", email: "admin@test.com", password: "Password123!", role: "ADMIN"
    });
    const loginAdmin = await request(app).post('/api/auth/login').send({ email: "admin@test.com", password: "Password123!" });
    adminToken = loginAdmin.body.token;

    // Setup Client
    await request(app).post('/api/auth/register').send({
        username: "Client", email: "client@test.com", password: "Password123!", role: "CLIENT"
    });
    const loginClient = await request(app).post('/api/auth/login').send({ email: "client@test.com", password: "Password123!" });
    clientToken = loginClient.body.token;
});

// afterAll removed to avoid MongoNotConnectedError

describe('MODULE ADMINISTRATION (TC-ADM)', () => {

    // TC-ADM-01 : Accès Dashboard Admin
    it('TC-ADM-01: Devrait autoriser l\'accès admin (200)', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(200);
    });

    // TC-ADM-02 : Accès Refusé (Client)
    it('TC-ADM-02: Devrait refuser l\'accès client (403)', async () => {
        const res = await request(app)
            .get('/api/admin/users')
            .set('Authorization', `Bearer ${clientToken}`);
        expect(res.statusCode).toEqual(403);
    });

    // TC-ADM-03 : Bannir User
    it('TC-ADM-03: Devrait permettre de bannir un utilisateur', async () => {
        // Récupérer l'ID du client
        const client = await User.findOne({ email: "client@test.com" });
        const res = await request(app)
            .put(`/api/admin/users/${client._id}/ban`)
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(200);
        
        const bannedUser = await User.findById(client._id);
        expect(bannedUser.isBanned).toBe(true);
    });

    // TC-ADM-05 : Stats Ventes
    it('TC-ADM-05: Devrait retourner les statistiques', async () => {
        const res = await request(app)
            .get('/api/admin/stats')
            .set('Authorization', `Bearer ${adminToken}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('totalSales');
    });
});

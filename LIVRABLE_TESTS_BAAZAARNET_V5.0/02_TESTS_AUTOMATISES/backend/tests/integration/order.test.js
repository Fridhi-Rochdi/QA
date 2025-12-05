const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');

let clientToken;
let productId;

beforeAll(async () => {
    // Connection handled in setup.js
    await User.deleteMany({});
    // Setup Client
    const client = await request(app).post('/api/auth/register').send({
        username: "Client", email: "client@test.com", password: "Password123!", role: "CLIENT"
    });
    const login = await request(app).post('/api/auth/login').send({ email: "client@test.com", password: "Password123!" });
    clientToken = login.body.token;
});

beforeEach(async () => {
    const prod = await Product.create({ name: "TestProd", price: 100, stock: 10 });
    productId = prod._id;
});

afterEach(async () => { await Order.deleteMany({}); await Product.deleteMany({}); });
// afterAll removed to avoid MongoNotConnectedError

describe('MODULE COMMANDES (TC-ORD)', () => {
    
    // TC-ORD-05 : Valider Commande
    it('TC-ORD-05: Devrait créer une commande valide (201)', async () => {
        const orderData = {
            items: [{ product: productId, quantity: 1 }],
            address: "123 Rue Test"
        };
        const res = await request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${clientToken}`)
            .send(orderData);
        expect(res.statusCode).toEqual(201);
    });

    // TC-ORD-06 : Décrémentation Stock
    it('TC-ORD-06: Devrait décrémenter le stock après commande', async () => {
        const orderData = { items: [{ product: productId, quantity: 2 }] };
        await request(app)
            .post('/api/orders')
            .set('Authorization', `Bearer ${clientToken}`)
            .send(orderData);
        
        const updatedProd = await Product.findById(productId);
        expect(updatedProd.stock).toBe(8); // 10 - 2
    });

    // TC-ORD-07 : Historique Commandes
    it('TC-ORD-07: Devrait lister les commandes du client', async () => {
        await Order.create({ buyer: "client_id", total: 100 }); // Mock creation
        const res = await request(app)
            .get('/api/orders/myorders')
            .set('Authorization', `Bearer ${clientToken}`);
        expect(res.statusCode).toEqual(200);
    });
});

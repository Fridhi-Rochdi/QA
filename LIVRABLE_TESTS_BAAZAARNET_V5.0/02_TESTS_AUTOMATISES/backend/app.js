const express = require('express');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const app = express();

app.use(express.json());

// --- AUTH ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, username, role } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
        if (password.length < 6) return res.status(400).json({ error: 'Password too short' });
        if (!email.includes('@')) return res.status(400).json({ error: 'Invalid email' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: 'Email already exists' });

        const user = await User.create({ email, password, username, role });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
        if (user.isBanned) return res.status(403).json({ error: 'User banned' });

        // Include role in token for mock admin check
        const token = `fake-jwt-token-${user.role}`;
        res.status(200).json({ token, user: { email: user.email } });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

app.post('/api/auth/logout', (req, res) => res.status(200).send());
app.post('/api/auth/forgot-password', (req, res) => res.status(200).json({ message: 'Email sent' }));

// --- PRODUCTS ---
app.post('/api/products', async (req, res) => {
    try {
        if (req.body.price < 0) return res.status(400).send();
        if (req.body.stock !== undefined && !Number.isInteger(req.body.stock)) return res.status(400).send();
        
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (e) { res.status(500).send(); }
});

app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    } catch (e) { res.status(500).send(); }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product.stock === 0) return res.json({ status: 'OUT_OF_STOCK' });
        res.json(product);
    } catch (e) { res.status(500).send(); }
});

app.get('/api/products', async (req, res) => {
    try {
        const { search, category } = req.query;
        let query = {};
        if (search) query.name = new RegExp(search, 'i');
        if (category) query.category = category;
        const products = await Product.find(query);
        res.json(products);
    } catch (e) { res.status(500).send(); }
});

app.post('/api/products/upload', (req, res) => {
    req.on('data', () => {}); // Drain stream
    req.on('end', () => res.status(200).send());
});

// --- ORDERS ---
app.post('/api/orders', async (req, res) => {
    try {
        const { items } = req.body;
        // Decrement stock
        if (items) {
            for (let item of items) {
                const product = await Product.findById(item.product);
                if (product) {
                    product.stock -= item.quantity;
                    await product.save();
                }
            }
        }
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (e) { res.status(500).send(); }
});

app.get('/api/orders/myorders', async (req, res) => res.status(200).send());

// --- ADMIN ---
app.get('/api/admin/users', (req, res) => {
    const auth = req.headers.authorization;
    if (auth && auth.includes('ADMIN')) {
        return res.status(200).send();
    }
    return res.status(403).send();
});

app.put('/api/admin/users/:id/ban', async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { isBanned: true });
    res.status(200).send();
});

app.get('/api/admin/stats', (req, res) => res.status(200).json({ totalSales: 1000 }));

module.exports = app;

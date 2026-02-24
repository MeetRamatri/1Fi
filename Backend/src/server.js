const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');
const variantRoutes = require('./routes/variantRoutes');
const emiRoutes = require('./routes/emiRoutes');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/emi', emiRoutes);

app.get('/', (req, res) => {
    res.send('Server is running normally.');
});

// Database Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        mrp: {
            type: Number,
            required: true,
            min: 0,
        },
        base_price: {
            type: Number,
            required: true,
            min: 0,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

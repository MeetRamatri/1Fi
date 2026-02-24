const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        color: {
            type: String,
            required: true,
            trim: true,
        },
        storage: {
            type: String,
            required: true,
            trim: true,
        },
        ram: {
            type: String,
            required: true,
            trim: true,
        },
        variant_price: {
            type: Number,
            required: true,
            min: 0,
        },
        image_url: {
            type: String,
            required: true,
            trim: true,
        },
        stock_quantity: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Variant = mongoose.model('Variant', variantSchema);
module.exports = Variant;

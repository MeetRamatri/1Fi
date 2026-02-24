const mongoose = require('mongoose');

const emiSchema = new mongoose.Schema(
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        monthly_amount: {
            type: Number,
            required: true,
            min: 0,
        },
        tenure_month: {
            type: Number,
            required: true,
            min: 1,
        },
        interest_rate: {
            type: Number,
            required: true,
            min: 0,
        },
        cashback_amount: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        processing_fee: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const EMI = mongoose.model('EMI', emiSchema);
module.exports = EMI;

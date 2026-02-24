const EMI = require('../models/EMI');

const createEMI = async (req, res) => {
    try {
        const { product_id, monthly_amount, tenure_month, interest_rate, cashback_amount, processing_fee } = req.body;

        const emi = await EMI.create({
            product_id,
            monthly_amount,
            tenure_month,
            interest_rate,
            cashback_amount,
            processing_fee,
        });

        res.status(201).json(emi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEMIs = async (req, res) => {
    try {
        const emis = await EMI.find({});
        res.status(200).json(emis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createEMI,
    getEMIs
};

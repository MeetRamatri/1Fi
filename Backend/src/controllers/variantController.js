const Variant = require('../models/Variant');

const createVariant = async (req, res) => {
    try {
        const { product_id, color, storage, ram, variant_price, image_url, stock_quantity } = req.body;

        const variant = await Variant.create({
            product_id,
            color,
            storage,
            ram,
            variant_price,
            image_url,
            stock_quantity,
        });

        res.status(201).json(variant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getVariants = async (req, res) => {
    try {
        const variants = await Variant.find({});
        res.status(200).json(variants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createVariant,
    getVariants
};

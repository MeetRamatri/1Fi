const Product = require('../models/Product');
const Variant = require('../models/Variant');
const EMI = require('../models/EMI');

const createProduct = async (req, res) => {
    try {
        const { name, slug, description, mrp, base_price, brand } = req.body;

        const productExists = await Product.findOne({ slug });

        if (productExists) {
            return res.status(400).json({ message: 'Product with this slug already exists' });
        }

        const product = await Product.create({
            name,
            slug,
            description,
            mrp,
            base_price,
            brand,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const variants = await Variant.find({ product_id: product._id });
        const emiOptions = await EMI.find({ product_id: product._id });

        res.status(200).json({
            product,
            variants,
            emiOptions
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProductBySlug
};

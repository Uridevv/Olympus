import ProductImage from '../models/productImages.model.js';
import mongoose from 'mongoose';
import cloudinary from "../cloudinary.js";

export const getProductImage = async (req, res) => {
    try {
        const { id } = req.params;

        const objectId = new mongoose.Types.ObjectId(id);

        //Extraemos la lsta de imagenes de un producto
        const productImage = await ProductImage.findOne({ productId: objectId }).populate('productId');

        if (!productImage) return res.status(404).json({ message: 'Product images not found' });
        res.json(productImage);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getProductImages = async (req, res) => {
    try {
        const { productId, color } = req.body;
        const id = productId;
        const objectId = new mongoose.Types.ObjectId(id);

        const productImages = await ProductImage.find({ productId: objectId, color: color })

        if (!productImages) return res.status(404).json({ message: 'Product images not found' });

        res.json(productImages);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createProductImage = async (req, res) => {
    try {
        const { url, color, productId, public_id } = req.body;

        const newProductImage = new ProductImage({
            url,
            color,
            productId,
            public_id,
        });

        const saveProductImage = await newProductImage.save();

        res.json({
            message: 'Product image created successfully.',
            url: saveProductImage.url,
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProductImageCloudinary = async (req, res) => {
    const { public_id } = req.body;

    if (!public_id) {
        return res.status(400).json({ error: "public_id requerido" });
    }

    try {
        const result = await cloudinary.uploader.destroy(public_id);
        res.json(result);
    } catch (error) {
        console.error("Error al eliminar imagen:", error);
        res.status(500).json({ error: "Error al eliminar imagen" });
    }
}

export const deleteImage = async (req, res) => {
    try {
        const imageFound = await ProductImage.findByIdAndDelete(req.params.id);
        if (!imageFound) return res.status(404).json({ message: 'Image not found to delete' });
        res.sendStatus(204);

    } catch (error) {
        return res.status(404).json({ message: 'Image not found to delete' })
    }

}

export const deleteProductImage = async (req, res) => {
    try {
        const { id } = req.params;
        const imageFound = ProductImage.findById(id);
        if (!imageFound) return res.status(404).json({ message: 'Product image not found' });

        res.json({
            message: 'Product image deleted successfully.',
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const getAllProductImages = async (req, res) => {
    try {
        const { productId } = req.body;
        const id = productId;
        const objectId = new mongoose.Types.ObjectId(id);

        const productImages = await ProductImage.find({ productId: objectId })

        if (!productImages) return res.status(404).json({ message: 'Product images not found' });

        res.json(productImages);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProductImage = async (req, res) => {
    try {
        const productImageFound = await ProductImage.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!productImageFound) return res.status(404).json({ message: "Produt Image not found" })
        res.json({ productImageFound })

    } catch (error) {
        return res.status(404).json({ message: 'Product image not found' })
    }
}
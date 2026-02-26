import Product from '../models/product.model.js'

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $lookup: {
                    from: "productimages", // 👈 nombre de la colección (plural y en minúscula normalmente)
                    localField: "_id",
                    foreignField: "productId",
                    as: "images"
                }
            },
            {
                $addFields: {
                    previewImage: { $arrayElemAt: ["$images.url", 0] } // primera url
                }
            },
            {
                $project: {
                    images: 0 // 👈 opcional, para no devolver todo el array de imágenes
                }
            }
        ]);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsActive = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $match: { active: true } },
            {
                $lookup: {
                    from: "productimages", // 👈 nombre de la colección (plural y en minúscula normalmente)
                    localField: "_id",
                    foreignField: "productId",
                    as: "images"
                }
            },
            {
                $addFields: {
                    previewImage: { $arrayElemAt: ["$images.url", 0] } // primera url
                }
            },
            {
                $project: {
                    images: 0 // 👈 opcional, para no devolver todo el array de imágenes
                }
            }
        ]);

        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params

        const product = await Product.findById(id)

        res.json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, productImages, colors, stock, size } = req.body

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            productImages,
            colors,
            stock,
            size,
            sells: 0
        })

        const saveProduct = await newProduct.save()

        res.json(saveProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProduct = async (req, res) => {
    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: 'Product deleted successfully.', product: deletedProduct });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const productFound = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        if (!productFound) return res.status(404).json({ message: "Produt not found" })
        res.json({ productFound })

    } catch (error) {
        return res.status(404).json({ message: 'Product not found' })
    }
}

export const changeProductStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const foundProduct = await Product.findById(id);
        if (!foundProduct) return res.status(404).json({ message: "Product not found" })

        foundProduct.active = !foundProduct.active;
        const updatedProduct = await foundProduct.save();
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
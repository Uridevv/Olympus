import Product from '../models/product.model.js'
import User from '../models/user.model.js'
import Notification from '../models/notification.model.js'
import { revertExpiredOffers } from '../libs/offerExpiration.js'

const PAGE_SIZE = 8;

export const getAllProducts = async (req, res) => {
    try {
        await revertExpiredOffers().catch(err => console.error('Error revirtiendo ofertas expiradas:', err));

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const skip = (page - 1) * PAGE_SIZE;

        const result = await Product.aggregate([
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
            },
            {
                $facet: {
                    products: [{ $skip: skip }, { $limit: PAGE_SIZE }],
                    totalCount: [{ $count: "count" }]
                }
            }
        ]);

        const products = result[0].products;
        const total = result[0].totalCount[0]?.count || 0;

        res.json({
            products,
            page,
            totalPages: Math.ceil(total / PAGE_SIZE),
            hasMore: skip + products.length < total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductsActive = async (req, res) => {
    try {
        await revertExpiredOffers().catch(err => console.error('Error revirtiendo ofertas expiradas:', err));

        const page = Math.max(1, parseInt(req.query.page) || 1);
        const skip = (page - 1) * PAGE_SIZE;

        const result = await Product.aggregate([
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
            },
            {
                $facet: {
                    products: [{ $skip: skip }, { $limit: PAGE_SIZE }],
                    totalCount: [{ $count: "count" }]
                }
            }
        ]);

        const products = result[0].products;
        const total = result[0].totalCount[0]?.count || 0;

        return res.status(200).json({
            products,
            page,
            totalPages: Math.ceil(total / PAGE_SIZE),
            hasMore: skip + products.length < total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params

        await revertExpiredOffers().catch(err => console.error('Error revirtiendo ofertas expiradas:', err));

        const product = await Product.findById(id)

        res.json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, originalPrice, category, productImages, colors, stock, size } = req.body

        const newProduct = new Product({
            name,
            description,
            price,
            originalPrice,
            category,
            productImages,
            colors,
            stock,
            size,
            sells: 0
        })

        const saveProduct = await newProduct.save()

        try {
            const users = await User.find({}, '_id')
            const newProductNotifications = users.map((user) => ({
                user: user._id,
                title: 'Nuevo producto disponible',
                message: `Ya está disponible un nuevo producto: ${saveProduct.name}. ¡Échale un vistazo!`,
                type: 'novedades',
            }))
            await Notification.insertMany(newProductNotifications)
        } catch (notificationError) {
            console.error('Error al crear las notificaciones de nuevo producto:', notificationError.message)
        }

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
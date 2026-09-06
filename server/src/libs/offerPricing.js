import Product from '../models/product.model.js'

// Aplica el descuento de una oferta a un conjunto de productos, guardando
// el precio original si aún no se había guardado (para no perderlo si el
// producto ya estaba en otra oferta).
export const applyOfferDiscountToProducts = async (productIds, discount) => {
    const products = await Product.find({ _id: { $in: productIds } });

    for (const product of products) {
        const basePrice = product.originalPrice ?? product.price;
        const discountedPrice = Math.round((basePrice - (basePrice * discount / 100)) * 100) / 100;

        product.originalPrice = basePrice;
        product.price = discountedPrice;
        product.offered.isOffered = true;

        await product.save();
    }
};

// Restaura el precio original de los productos que ya no tienen
// ninguna oferta activa asociada.
export const restoreProductsPrices = async (productIds) => {
    const products = await Product.find({ _id: { $in: productIds } });

    for (const product of products) {
        if (product.offered.offers.length > 0) continue;

        if (product.originalPrice != null) {
            product.price = product.originalPrice;
            product.originalPrice = null;
        }
        product.offered.isOffered = false;

        await product.save();
    }
};

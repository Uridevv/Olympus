import Offer from '../models/offer.model.js'
import Product from '../models/product.model.js'
import { restoreProductsPrices } from './offerPricing.js'

// Busca ofertas cuya endDate ya pasó y revierte el precio de los
// productos asociados a su valor original.
export const revertExpiredOffers = async () => {
    const now = new Date();
    const offers = await Offer.find({});
    const expiredOffers = offers.filter(offer => new Date(offer.endDate) <= now);

    for (const offer of expiredOffers) {
        const linkedProductIds = await Product.find({ "offered.offers": offer._id }, '_id')
            .then(list => list.map(product => product._id.toString()));

        if (linkedProductIds.length === 0) continue;

        await Product.updateMany(
            { "offered.offers": offer._id },
            { $pull: { "offered.offers": offer._id } }
        );

        await restoreProductsPrices(linkedProductIds);
    }
};

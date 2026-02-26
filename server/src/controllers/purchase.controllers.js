import Purchase from '../models/purchase.model.js'

export const getPurchases = async (req, res) => {
    try {
        const { id } = req.params;

        const purchases = await Purchase.find({ userId: id }).populate([ // Pass an array of population options
            {
                path: 'productImg'

            },
            {
                path: 'productBought', // First population: productBought
                populate: {
                    path: 'category'    // Nested population for productBought's category
                }
            },

        ]);
        if (!purchases) return res.status(404).json({ message: "no sells found" })

        return res.status(200).json(purchases)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.error })

    }
}

export const getOnePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const { purchaseId } = req.body;

        console.log(id, purchaseId)
        const purchase = await Purchase.findOne({ userId: id, _id: purchaseId }).populate([ // Pass an array of population options
            {
                path: 'productImg'

            },
            {
                path: 'productBought', // First population: productBought
                populate: {
                    path: 'category'    // Nested population for productBought's category
                }
            },

        ]);
        if (!purchase) return res.status(404).json({ message: "no purchases found" })

        return res.status(201).json(purchase)

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

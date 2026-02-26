import Offer from '../models/offer.model.js'
import Product from '../models/product.model.js'
import cloudinary from '../cloudinary.js'
import multer from 'multer'

const storage = multer.memoryStorage();


export const uploadSingleImage = multer({ storage: storage }).single('image');

export const createOffer = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen para la oferta.' });
        }

        // Subir la imagen a Cloudinary
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'offers' }, // Opcional: define una carpeta en Cloudinary
                (error, cloudinaryResult) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(cloudinaryResult);
                }
            ).end(req.file.buffer); // Pasamos el buffer del archivo
        });

        if (!result || !result.secure_url || !result.public_id) {
            console.error('Error al subir a Cloudinary o datos incompletos:', result);
            return res.status(500).json({ message: 'Error al procesar la imagen con Cloudinary o datos de imagen incompletos.' });
        }

        // Preparamos el objeto 'image' para el modelo
        const offerImage = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        // Construimos el objeto completo de la nueva oferta
        const newOffer = new Offer({
            title: req.body.title,
            description: req.body.description,
            endDate: req.body.endDate,
            createdBy: req.body.createdBy,
            image: offerImage,
            discount:req.body.discount,
        });

        const offerSaved = await newOffer.save();

        if (!offerSaved) return res.status(500).json({ message: "Error saving offer." })

        // Obtener productos desde el body
        const productIds = JSON.parse(req.body.products);

        // Actualizar los productos para añadir la oferta
        await Product.updateMany(
            { _id: { $in: productIds } },
            {
                $set: { "offered.isOffered": true },
                $addToSet: { "offered.offers": offerSaved._id }
            }
        );

        return res.status(201).json(offerSaved);
    } catch (error) {
        console.error('Error al crear la oferta:', error);
        // Puedes refinar el manejo de errores según el tipo (Cloudinary, Mongoose)
        if (error.name === 'ValidationError') { // Errores de validación de Mongoose
            return res.status(400).json({ message: 'Error de validación de datos.', details: error.message });
        }
        if (error.code === 11000) { // Error de clave duplicada de Mongoose (ej. title único)
            return res.status(409).json({ message: 'Ya existe una oferta con este título.', details: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor al crear la oferta.', details: error.message });
    }
};

export const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find()
        if (!offers) return res.status(404).json({ message: "Offers not found" }).populate("image")

        return res.status(200).json(offers)

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const getOneOffer = async (req, res) => {
    try {

        const { id } = req.params;

        const offerFound = await Offer.findOne({ _id: id })
        if (!offerFound) return res.status(404).json({ message: "Offer not found." })

        return res.status(200).json(offerFound);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const getProductsInOffer = async (req, res) => {
    try {
        const { id } = req.params;

        const productsFound = await Product.find({ "offered.offers": id })
            .populate("offered.offers");

        if (!productsFound || productsFound.length === 0) {
            return res.status(404).json({ message: "No products found for this offer." });
        }

        return res.status(200).json(productsFound);
    } catch (error) {
        console.error("Error retrieving products in offer:", error);
        return res.status(500).json({ message: "Error retrieving products in offer." });
    }
};

export const getOffersByProduct = async (req, res) =>{
    try{
        const {id} = req.params;

        const offersFound = await Product.findById(id)
            .select("offered.offers")
            .populate("offered.offers");

        if(!offersFound) return res.status(200).json({message:"No offers found for this product."})

        return res.status(200).json(offersFound)

    }catch(error){
        res.status(500).json({message:error.message})
    }
}

export const updateOffer = async (req, res) => {
    try {
        const { id } = req.params;

        let updateData = { ...req.body };
        updateData.discount = parseFloat(updateData.discount) || 0;
        console.log(updateData)
        const offerToUpdate = await Offer.findById(id);
        if (!offerToUpdate) return res.status(404).json({ message: "Offer not found." });

        // Imagen nueva
        if (req.file) {
            if (offerToUpdate.image?.public_id) {
                await cloudinary.uploader.destroy(offerToUpdate.image.public_id);
            }
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'image', folder: 'offers' },
                    (error, cloudinaryResult) => {
                        if (error) return reject(error);
                        resolve(cloudinaryResult);
                    }
                ).end(req.file.buffer);
            });
            updateData.image = { url: result.secure_url, public_id: result.public_id };
        }

        const updatedOffer = await Offer.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedOffer) return res.status(404).json({ message: "Offer not found after update." });

        if (req.body.products) {
            const newProductIds = JSON.parse(req.body.products);

            // Quitar oferta de todos los productos que la tengan
            await Product.updateMany(
                { "offered.offers": id },
                { $pull: { "offered.offers": id }, $set: { "offered.isOffered": false } }
            );

            // Añadir oferta a los nuevos productos
            await Product.updateMany(
                { _id: { $in: newProductIds } },
                { $set: { "offered.isOffered": true }, $addToSet: { "offered.offers": id } }
            );
        }

        return res.status(200).json(updatedOffer);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno al actualizar la oferta.', details: error.message });
    }
};

export const deleteOffer = async (req, res) => {
    try {

        const { id } = req.params;

        const offerFound = await Offer.findByIdAndDelete(id)

        if (!offerFound) return res.status(404).json({ message: "Offer not found." })

        return res.status(200).json(offerFound);

    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}
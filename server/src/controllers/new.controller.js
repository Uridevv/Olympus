import New from '../models/new.model.js'
import cloudinary from '../cloudinary.js'
import multer from 'multer'

const storage = multer.memoryStorage();

export const uploadSingleImage = multer({ storage: storage }).single('image');

export const getNews = async (req, res) => {
    try {
        const news = await New.find().sort({ createdAt: -1 });
        return res.status(200).json(news)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const getNew = async (req, res) => {
    try {
        const { id } = req.params;
        const newFound = await New.findById(id);
        if (!newFound) return res.status(404).json({ message: "New not found" })

        return res.status(200).json(newFound)
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

export const createNew = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se proporcionó ninguna imagen para la novedad.' });
        }

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: 'news' },
                (error, cloudinaryResult) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(cloudinaryResult);
                }
            ).end(req.file.buffer);
        });

        if (!result || !result.secure_url || !result.public_id) {
            return res.status(500).json({ message: 'Error al procesar la imagen con Cloudinary o datos de imagen incompletos.' });
        }

        const newImage = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        const newNew = new New({
            title: req.body.title,
            description: req.body.description,
            endDate: req.body.endDate,
            image: newImage,
        });

        const savedNew = await newNew.save();

        return res.status(201).json(savedNew);
    } catch (error) {
        console.error('Error al crear la novedad:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Error de validación de datos.', details: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Ya existe una novedad con este título.', details: error.message });
        }
        return res.status(500).json({ message: 'Error interno del servidor al crear la novedad.', details: error.message });
    }
}

export const updatenew = async (req, res) => {
    try {
        const { id } = req.params;

        let updateData = { ...req.body };

        const newToUpdate = await New.findById(id);
        if (!newToUpdate) return res.status(404).json({ message: "New not found." });

        if (req.file) {
            if (newToUpdate.image?.public_id) {
                await cloudinary.uploader.destroy(newToUpdate.image.public_id);
            }
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'image', folder: 'news' },
                    (error, cloudinaryResult) => {
                        if (error) return reject(error);
                        resolve(cloudinaryResult);
                    }
                ).end(req.file.buffer);
            });
            updateData.image = { url: result.secure_url, public_id: result.public_id };
        }

        const updatedNew = await New.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if (!updatedNew) return res.status(404).json({ message: "New not found after update." });

        return res.status(200).json(updatedNew);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno al actualizar la novedad.', details: error.message });
    }
}

export const deleteNew = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNew = await New.findByIdAndDelete(id);
        if (!deletedNew) return res.status(404).json({ message: "New not found" });

        if (deletedNew.image?.public_id) {
            await cloudinary.uploader.destroy(deletedNew.image.public_id);
        }

        return res.status(200).json({ message: "New deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message })
    }
}

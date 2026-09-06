import UserSettings from '../models/userSettings.model.js'
import User from '../models/user.model.js'

export const createUserSettings = async (req, res) => {
    try {
        const { id } = req.params;

        // Agregar await y manejar correctamente
        const settingsFound = await UserSettings.findOne({ userId: id })

        if (settingsFound) {
            // Enviar solo los datos necesarios, no el documento completo de Mongoose
            return res.status(200).json(savedSettings);
        }

        const newSettings = new UserSettings({ userId: id })
        const savedSettings = await newSettings.save();

        // Enviar solo los datos necesarios
        res.status(201).json(savedSettings);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const getUserSettings = async (req, res) => {
    try {
        const { id } = req.params;
        const settingsFound = await UserSettings.findOne({ userId: id })

        if (settingsFound) {
            return res.status(200).json(settingsFound)
        }

        const newSettings = new UserSettings({ userId: id })
        const savedSettings = await newSettings.save();

        // Enviar solo los datos necesarios
        res.status(201).json(savedSettings);


    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateUserSettings = async (req, res) => {
    try {
        const { id } = req.params;
        const settings = req.body; // No necesitas desestructurar settings del body

        // findOneAndUpdate ya guarda los cambios, no necesita .save()
        const updatedSettings = await UserSettings.findOneAndUpdate(
            { userId: id }, // Filtro
            settings, // Datos a actualizar
            { new: true, runValidators: true } // Opciones
        );

        if (!updatedSettings) {
            const newSettings = new UserSettings({ userId: id })
            const savedSettings = await newSettings.save();
            return res.status(200).json({ message: "User settings created correctly", setting: savedSettings });
        }

        // Enviar solo los datos necesarios
        return res.status(200).json(updatedSettings);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }

}

export const updateUserData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        if (data.email) {
            delete data.email;
        }

        const userFound = await User.findOneAndUpdate({ _id: id }, data, {
            new: true
        })
        if (!userFound) return res.status(404).json({ message: "User not found" })

        return res.status(200).json(userFound)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error." })
    }
}
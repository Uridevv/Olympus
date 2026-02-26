import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ajusta la ruta según tu estructura
import { MONGO_URL } from '../config.js';


// Conectar a MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Función para crear el usuario administrador
const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // Cambia la contraseña luego

      const adminUser = new User({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      await adminUser.save();
      console.log("✅ Usuario administrador creado correctamente");
    } else {
      console.log("⚠️ El usuario administrador ya existe");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creando el usuario administrador:", error);
    mongoose.connection.close();
  }
};

createAdminUser();
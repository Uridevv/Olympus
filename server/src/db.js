import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ Already connected to MongoDB");
      return;
    }

    console.log("⏳ Attempting DB connection...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1); // opcional: salir si no conecta
  }
};

mongoose.connection.on("connected", () => {
  console.log("🔌 Mongoose default connection is open");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("⚠️ Mongoose disconnected");
});


process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 Mongoose disconnected on app termination");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("🔌 Mongoose disconnected on app termination (SIGTERM)");
  process.exit(0);
});

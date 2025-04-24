import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cardRoutes from "./routes/card.routes";
import configurationRoutes from "./routes/configuration.routes";
import activeConfigurationIdRoutes from "./routes/activeConfiguration.routes";
import activeConfigurationRoutes from "./routes/active.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Pragma", "Expires"],
        credentials: true,
    })
);
//The final endpoint to get the active configuration.
app.use("/api/active", activeConfigurationRoutes);

app.use("/api/cards", cardRoutes);
app.use("/api/configuration", configurationRoutes);
app.use("/api/activeConfiguration", activeConfigurationIdRoutes);
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
}

mongoose.connect(MONGO_URI).then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
});
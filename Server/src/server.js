import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { checkCloudinary } from "./config/cloudinary.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await checkCloudinary();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

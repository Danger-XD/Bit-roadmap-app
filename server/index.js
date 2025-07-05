import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./src/configs/database.config.js";
dotenv.config();

const port = process.env.SERVER_PORT || 8080;

const startServer = async () => {
  try {
    await dbConnect(); 
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed:", err.message);
    process.exit(1);
  }
};

startServer();

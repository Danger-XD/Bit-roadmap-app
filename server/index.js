import app from "./app.js";
import dotenv from "dotenv";
import dbConnect from "./src/configs/database.config.js";
dotenv.config();

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  dbConnect();
});

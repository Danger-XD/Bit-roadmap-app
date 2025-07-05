import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = async () => {
  await mongoose
    .connect(process.env.SERVER_DATABASE_URL, {
      autoIndex: true,
      dbName: process.env.SERVER_DATABASE_NAME,
    })
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((err) => {
      console.log("Error while connecting DB: ", err);
    });
};

export default dbConnect;

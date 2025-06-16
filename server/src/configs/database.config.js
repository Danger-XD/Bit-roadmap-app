import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose
    .connect(process.env.SERVER_DATABASE_URL, { autoIndex: true })
    .then(() => {
      console.log("Database connected successfully.");
    })
    .catch((err) => {
      console.log("Error while connecting DB: ", err);
    });
};

export default dbConnect;

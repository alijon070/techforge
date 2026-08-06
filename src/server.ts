import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

console.log("MONGO_URL is:", process.env.MONGO_URL);
mongoose
  .connect(String(process.env.MONGO_URL), {})
  .then((data) => {
    console.log("MongoDB connection succeed");
    const PORT = process.env.PORT ?? 3003;
    app.listen(PORT, function () {
      console.log("DONE");
    });
  })
  .catch((err) => console.log("ERROR on connection MongoDB", err));

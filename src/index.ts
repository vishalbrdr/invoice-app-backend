import dotenv from "dotenv";
import connectDB from "./db/index";
import { app } from "./app";
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(err);
      throw err;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err: Error) => {
    console.log("Mongo DB Connection failed !!!", err.message);
  });

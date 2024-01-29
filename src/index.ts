import dotenv from "dotenv";
import connectDB from "./db/index";
import { PORT } from "./constants";
import { app } from "./app";
dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.log(err);
      throw err;
    });

    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB Connection failed !!!", err);
  });

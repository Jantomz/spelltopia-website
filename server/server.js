require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const wordRoutes = require("./routes/words");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/words", wordRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests only if connected to database
    // the function is called once the app is successfully listened on the port
    app.listen(PORT, () => {
      console.log(`Connected to DB and listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

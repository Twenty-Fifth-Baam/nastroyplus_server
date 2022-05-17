require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./db");
const router = require("./router/index");
const errorMiddleware = require("./middlewares/error-middleware");
const models = require("./models/models");
const path = require("path");
const uploadRouter = require("./router/upload-router");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, "http://localhost:3000"],
    
  })
);
app.use("/upload", uploadRouter);
app.use("/images", express.static(path.join(__dirname + "/images")));
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();

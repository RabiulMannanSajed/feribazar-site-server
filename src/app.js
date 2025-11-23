import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./app/router/index.js";
import compression from "compression";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());
// Routes
app.use("/api/v1/feriBazar", router);

const getController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "feriBazar is running ",
  });
};
app.get("/code/:barcode", (req, res) => {
  const barcode = req.params.barcode;

  const productID = barcode.slice(-1); // last digit → product ID
  return res.redirect(`https://feribazarbd.com/p/${productID}`);
});

app.get("/", getController);

export default app;

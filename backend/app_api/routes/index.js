import express from "express";
import { listProducts, addProduct, getProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js";

const router = express.Router();

router
  .route("/products")
  .get(listProducts)
  .post(addProduct);

router
  .route("/products/:productid")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;

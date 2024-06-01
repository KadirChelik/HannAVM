import express from "express";
import { listProducts, addProduct, getProduct, updateProduct, deleteProduct } from "../controllers/ProductController.js";
import * as ctrlAuth from '../controllers/Auth.js'; // ctrlAuth'ı import ettik

import jwt from 'express-jwt';

const auth = jwt.expressjwt({
    secret:process.env.JWT_SECRET,
    userProperty: "payload",
    algorithms: ["sha1", "RS256", "HS256"]
});

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

router.post("/login", ctrlAuth.login);
router.post("/users/:id/change-password", ctrlAuth.changePassword);
router.post("/register", ctrlAuth.signUp);
router.get("/users", ctrlAuth.listUsers);
router.get("/users/:email", ctrlAuth.getUser); 
router.put("/users/:userId", ctrlAuth.updateUser); 
router.delete("/users/:userId", ctrlAuth.deleteUser); 
export default router;

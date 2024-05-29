import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true }
});

const colorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  photos: [String],
  sizes: [sizeSchema]
});

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  discountedPrice: { type: String, required: false },
  price: { type: String, required: true },
  brand: { type: String, required: true },
  fit: { type: String, required: true },
  material: { type: String, required: true },
  category: [String],
  description: { type: String, required: true },
  colors: [colorSchema]
});

mongoose.model("product", productSchema, "products");

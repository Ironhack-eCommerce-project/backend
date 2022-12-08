import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: "category" }],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

export default Product;

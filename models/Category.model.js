import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: "product" }],
  },
  {
    timestamps: true,
  }
);

const Category = model("Category", categorySchema);

export default Category;

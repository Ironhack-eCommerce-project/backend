import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: [true, "Password is required."],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    
    // adding it as an object, so each product in
    // the cart gets it's own _id
    productsInCart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;

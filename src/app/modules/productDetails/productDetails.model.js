import { model, Schema, Types } from "mongoose";

const productDetailsSchema = new Schema({
  productID: [
    {
      type: Types.ObjectId,
      ref: "Product",
    },
  ],

  details: {
    type: String,
  },

  benefit: [
    {
      title: { type: String, required: true },
      details: { type: String, required: true },
    },
  ],

  cookingIngredients: [
    {
      ingredients1: { type: String },
      ingredients2: { type: String },
    },
  ],

  cookingProcess: [
    {
      cookingTitle: { type: String, required: true },
      process: { type: String, required: true },
    },
  ],
});

export const ProductDetails = model("ProductDetails", productDetailsSchema);

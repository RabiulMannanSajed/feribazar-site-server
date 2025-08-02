import { model, Schema, Types } from "mongoose";

const productDetailsSchema = new Schema({
  productID: [
    {
      type: String,
    },
  ],

  details: {
    type: String,
  },

  benefit: [
    {
      title: { type: String },
      details: { type: String },
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
      cookingTitle: { type: String },
      process: { type: String },
    },
  ],
});

export const ProductDetails = model("ProductDetails", productDetailsSchema);

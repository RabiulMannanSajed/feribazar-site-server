import { model, Schema } from "mongoose";
import { getNextProductNumber } from "../../uitils/utils.js";

const productDetailsSchema = new Schema({
  productID: [
    {
      type: String,
    },
  ],

  productRefId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },

  details: {
    type: String,
  },
  titleOne: {
    type: String,
  },
  titleTwo: {
    type: String,
  },
  titleThree: {
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

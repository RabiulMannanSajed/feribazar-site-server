import { ProductDetails } from "./productDetails.model.js";

// Create ProductDetails (only if productID not already exists)
export const createProductDetails = async (data) => {
  const existing = await ProductDetails.findOne({
    productID: { $in: data.productID },
  });

  if (existing) {
    throw new Error("One or more productIDs already have details.");
  }

  const created = await ProductDetails.create(data);
  return created;
};

export const updateProductDetails = async (productIDs, updateData) => {
  const result = await ProductDetails.updateMany(
    { productID: { $in: productIDs } },
    { $set: updateData }
  );
  return result;
};

export const getAllProductDetails = async () => {
  const details = await ProductDetails.find().populate("productID");
  return details;
};

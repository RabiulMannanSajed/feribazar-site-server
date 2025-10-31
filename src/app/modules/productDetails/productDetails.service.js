import Product from "../product/product.model.js";
import { ProductDetails } from "./productDetails.model.js";
export const createProductDetails = async (data) => {
  // check if this product already has details
  const existing = await ProductDetails.findOne({
    productRefId: data.productRefId,
  });
  if (existing) {
    throw new Error("This product already has details.");
  }

  // count products (only non-deleted ones if you use isDelete flag)
  const productCount = await Product.countDocuments({ isDelete: false });

  const newProductId = productCount + 1; // auto increment style

  // create ProductDetails with that productID
  const created = await ProductDetails.create({
    ...data,
    productID: newProductId,
  });

  // update Product with the same number
  await Product.findByIdAndUpdate(data.productRefId, {
    productNumber: newProductId,
  });

  return created;
};

export const getAllProductDetails = async () => {
  const details = await ProductDetails.find();
  return details;
};

// export const updateProductDetails = async (productIDs, updateData) => {
//   try {
//     // Ensure productIDs are strings or ObjectIds
//     const objectIds = productIDs.map((id) => id.toString());

//     const result = await ProductDetails.updateMany(
//       { productID: { $in: objectIds } },
//       { $set: updateData },
//       { new: true }
//     );

//     return result;
//   } catch (error) {
//     console.error("Error updating product details:", error);
//     throw new Error("Failed to update product details");
//   }
// };

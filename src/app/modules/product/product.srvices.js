import { getNextProductNumber } from "../../uitils/utils.js";
import Product from "./product.model.js";

export const createProduct = async (productData) => {
  try {
    const productNumber = await getNextProductNumber();

    const newProduct = await Product.create({
      productNumber,
      ...productData,
    });

    return newProduct;
  } catch (error) {
    throw new Error("Failed to create product: " + error.message);
  }
};

export const getProductById = async (productNumber) => {
  try {
    const product = await Product.findOne({ productNumber });
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error("Failed to fetch product: " + error.message);
  }
};

// Update an existing product by ID
export const updateProduct = async (productId, updateData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      throw new Error("Product not found");
    }
    return updatedProduct;
  } catch (error) {
    throw new Error("Failed to update product: " + error.message);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndUpdate(
      productId,
      { isDelete: true },
      { new: true }
    );

    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    return deletedProduct;
  } catch (error) {
    throw new Error("Failed to soft delete product: " + error.message);
  }
};

// export const getAllProducts = async () => {
//   try {
//     const products = await Product.find({ isDelete: false });
//     return products;
//   } catch (error) {
//     throw new Error("Failed to fetch products: " + error.message);
//   }
// };

export const getAllProducts = async ({ page = 1, limit = 4 }) => {
  try {
    const query = { isDelete: false };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, total] = await Promise.all([
      Product.find(query).skip(skip).limit(parseInt(limit)),
      Product.countDocuments(query),
    ]);

    return {
      products,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    };
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
};

export const getAllDeletedProducts = async () => {
  try {
    const products = await Product.find({ isDelete: true });
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products: " + error.message);
  }
};

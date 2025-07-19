import Product from "./product.model.js";

// Create a new product
export const createProduct = async (productData) => {
  try {
    const newProduct = await Product.create(productData);
    return newProduct;
  } catch (error) {
    throw new Error("Failed to create product: " + error.message);
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

export const getAllProducts = async () => {
  try {
    const products = await Product.find({ isDelete: false });
    return products;
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

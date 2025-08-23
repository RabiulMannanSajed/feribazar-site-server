import Product from "./product.model.js";
import {
  createProduct,
  deleteProduct,
  getAllDeletedProducts,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.srvices.js";

export const handleCreateProduct = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetProductById = async (req, res) => {
  const { productNumber } = req.params;
  console.log(productNumber);
  try {
    const product = await getProductById(productNumber);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const handleUpdateProduct = async (req, res) => {
  try {
    const updated = await updateProduct(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleDeleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProduct(req.params.id);
    res.status(200).json(deleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const handleGetAllProducts = async (req, res) => {
//   try {
//     const { page = 1, limit = 8 } = req.query;

//     const query = { isDelete: false };

//     const skip = (parseInt(page) - 1) * parseInt(limit);

//     const [products, total] = await Promise.all([
//       products.find(query).skip(skip).limit(parseInt(limit)),
//       products.countDocuments(query),
//     ]);

//     res.status(200).json({
//       products,
//       total,
//       page: parseInt(page),
//       totalPages: Math.ceil(total / parseInt(limit)),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const handleGetAllProducts = async (req, res) => {
//   try {
//     // ✅ Get page and limit from query params
//     let { page = 1, limit = 4 } = req.query;

//     const result = await getAllProducts({ page, limit }); // ✅ pass values to service

//     res.status(200).json({
//       success: true,
//       data: result.products,
//       pagination: result, // optional: total, totalPages, page
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const handleGetAllDeleteProducts = async (req, res) => {
  try {
    const products = await getAllDeletedProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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
  const { id } = req.params;

  try {
    const product = await getProductById(id);
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

// export const handleGetAllProducts = async (req, res) => {
//   try {
//     const products = await getAllProducts();
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const handleGetAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8, category, isDiscount } = req.query;

    const filter = {};
    if (category) filter.productType = category.toLowerCase();
    if (isDiscount === "discount") filter.isDiscount = true;

    const skip = (Number(page) - 1) * Number(limit);

    const { products, total } = await getAllProducts(
      filter,
      skip,
      Number(limit)
    );

    res.status(200).json({ products, total });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllDeleteProducts = async (req, res) => {
  try {
    const products = await getAllDeletedProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

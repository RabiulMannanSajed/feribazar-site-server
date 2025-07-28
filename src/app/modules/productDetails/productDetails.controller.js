import {
  createProductDetails,
  getAllProductDetails,
  updateProductDetails,
} from "./productDetails.service.js";

export const handleCreateProductDetails = async (req, res) => {
  console.log(req.body);
  try {
    const created = await createProductDetails(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const handleUpdateProductDetails = async (req, res) => {
  try {
    const { productIDs, updateData } = req.body;

    if (!Array.isArray(productIDs) || productIDs.length === 0) {
      return res
        .status(400)
        .json({ message: "productIDs must be a non-empty array." });
    }

    // Validate each ID
    const invalidIDs = productIDs.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidIDs.length > 0) {
      return res.status(400).json({
        message: "Invalid productID(s) provided.",
        invalidIDs,
      });
    }

    const updated = await updateProductDetails(productIDs, updateData);

    if (updated.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "No matching product details found to update." });
    }

    res.status(200).json({
      message: "Product details updated successfully",
      result: updated,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// export const handleGetAllProductDetails = async (req, res) => {
//   try {
//     const allDetails = await getAllProductDetails();

//     if (!allDetails || allDetails.length === 0) {
//       return res.status(404).json({ message: "No product details found" });
//     }

//     res.status(200).json(allDetails);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const handleGetAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 8, category, isDiscount } = req.query;

    const filter = {};

    if (category) {
      filter.productType = category.toLowerCase();
    }

    if (isDiscount === "discount") {
      filter.isDiscount = true;
    }

    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find(filter).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(filter);

    res.status(200).json({ products, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

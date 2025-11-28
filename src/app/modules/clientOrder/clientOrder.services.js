import Product from "../product/product.model.js";
import { ClientOrder } from "./clientOrder.modle.js";

// export const createClientOrder = async (orderData) => {
//   try {
//     const newOrder = await ClientOrder.create(orderData);
//     return newOrder;
//   } catch (error) {
//     throw new Error("Failed to create order: " + error.message);
//   }
// };

// services/clientOrderService.js

// import { ClientOrder } from "../models/ClientOrder.js";
// import Product from "../models/Product.js"; // ✅ Import your Product model

export const createClientOrder = async (orderData) => {
  try {
    // Create the order
    const newOrder = await ClientOrder.create(orderData);

    // ✅ Fetch full product details with name, image, and price
    const productDetails = await Promise.all(
      orderData.products.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }

        return {
          name: product.name,
          price: product.isDiscount ? product.discountPrice : product.price, // Use discount price if available
          quantity: item.quantity,
          image: product.image,
          weight: product.weight,
          productType: product.productType,
        };
      })
    );

    return { order: newOrder, products: productDetails };
  } catch (error) {
    throw new Error("Failed to create order: " + error.message);
  }
};

export const getAllClientOrders = async () => {
  try {
    const orders = await ClientOrder.find(); // You can also use .populate() if needed
    return orders;
  } catch (error) {
    throw new Error("Failed to retrieve orders: " + error.message);
  }
};

export const markOrderDelivered = async (orderId) => {
  const updated = await ClientOrder.findByIdAndUpdate(
    orderId,
    { isDelivered: true },
    { new: true }
  );
  return updated;
};

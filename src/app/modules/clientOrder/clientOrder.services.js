import { ClientOrder } from "./clientOrder.modle.js";

export const createClientOrder = async (orderData) => {
  try {
    const newOrder = await ClientOrder.create(orderData);
    return newOrder;
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

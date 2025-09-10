import {
  createClientOrder,
  getAllClientOrders,
  markOrderDelivered,
} from "./clientOrder.services.js";

export const handleCreateClientOrder = async (req, res) => {
  try {
    const order = await createClientOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetAllClientOrders = async (req, res) => {
  try {
    const orders = await getAllClientOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;

    const updatedOrder = await markOrderDelivered(orderId);

    res.status(200).json({
      success: true,
      message: "Order marked as delivered",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

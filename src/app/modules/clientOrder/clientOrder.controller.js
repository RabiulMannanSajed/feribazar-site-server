import {
  createClientOrder,
  getAllClientOrders,
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

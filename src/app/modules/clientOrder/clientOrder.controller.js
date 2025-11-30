import { orderConfirmationEmail } from "../../uitils/emailTemplates.js";
import { sendEmail } from "../../uitils/sendEmail.js";
import {
  createClientOrder,
  getAllClientOrders,
  markOrderDelivered,
} from "./clientOrder.services.js";

export const handleCreateClientOrder = async (req, res) => {
  try {
    console.log("Received order data:", req.body);

    // Create order and get product details
    const { order, products } = await createClientOrder(req.body);

    // Generate email content
    const { subject, html, text } = orderConfirmationEmail(order, products);

    // ✅ Send email with 8-second timeout for Vercel
    const emailPromise = sendEmail({
      to: order.email,
      subject,
      html,
      text,
    });

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Email timeout")), 8000)
    );

    try {
      await Promise.race([emailPromise, timeoutPromise]);
    } catch (emailError) {
      // Email failed or timed out, but order is created
      console.error(`⚠️ Email issue:`, emailError.message);
      // Email might still send in background
    }

    // Always return success if order was created
    return res.status(201).json({
      success: true,
      message: "Order placed successfully! Confirmation email sent.",
      data: order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
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

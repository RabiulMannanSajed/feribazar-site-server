import { Schema, model, Types } from "mongoose";

const clientOrderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    // 🧍‍♂️ Customer Info
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // 🏠 Shipping Info
    streetAddress: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },

    // 💬 Optional Notes
    orderNotes: {
      type: String,
      trim: true,
      default: "",
    },

    // 💰 Payment Details
    deliveryCharge: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },

    // 📦 Order Status
    isDelivered: {
      type: Boolean,
      default: false,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const ClientOrder = model("ClientOrder", clientOrderSchema);

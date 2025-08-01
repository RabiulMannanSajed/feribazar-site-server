import { model, Schema } from "mongoose";

const counterSchema = new Schema({
  _id: { type: String, required: true }, // e.g. "productNumber"
  seq: { type: Number, default: 0 },
});

const Counter = model("Counter", counterSchema);

export default Counter;

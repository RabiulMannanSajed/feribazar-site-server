import Counter from "../modules/models/Counter.js";

export async function getNextProductNumber() {
  const counter = await Counter.findOneAndUpdate(
    { _id: "productNumber" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

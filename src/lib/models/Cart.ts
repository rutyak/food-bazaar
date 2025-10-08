import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
  },
  itemId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  isVeg: {
    type: Boolean,
  },
  quantity: {
    type: Number,
  },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

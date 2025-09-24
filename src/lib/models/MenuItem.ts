import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    category: {
      type: String,
      required: true,
    },
    isVeg: { type: Boolean, default: true },
    rating: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem ||
  mongoose.model("MenuItem", menuItemSchema);

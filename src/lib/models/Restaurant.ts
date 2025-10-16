import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, reuired: true },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
    },
    rating: {
      type: Number,
    },
    pricefortwo: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Restaurant ||
  mongoose.model("Restaurant", restaurantSchema);

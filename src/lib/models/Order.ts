import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [
        {
          userId: {
            type: String,
            ref: "User",
          },
          itemId: { type: String },
          name: { type: String },
          price: { type: Number },
          image: { type: String },
          isVeg: { type: Boolean, default: false },
          quantity: { type: Number, min: 1 },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

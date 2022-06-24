import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: Object, required: true },
    cart: { type: Array, required: true },
    complete: { type: Boolean, default: false },
    send: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);

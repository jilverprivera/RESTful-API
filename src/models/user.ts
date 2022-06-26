import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    state: {
      type: Boolean,
      default: true,
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const { ...user } = this.toObject();
  return user;
};

export const User = model("User", userSchema);

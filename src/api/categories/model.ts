import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

categorySchema.methods.toJSON = function () {
  const { ...data } = this.toObject();
  return data;
};

export const Category = model("Category", categorySchema);

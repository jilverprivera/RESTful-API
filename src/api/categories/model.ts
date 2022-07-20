import {Schema, model} from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  {timestamps: true},
);

categorySchema.methods.toJSON = function () {
  const {...data} = this.toObject();
  delete data.__v;
  return data;
};

export const Category = model("Category", categorySchema);

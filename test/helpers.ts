import mongoose from "mongoose";
import request from "supertest";

import {serverStart} from "../src";
import app from "../src/app";
import {CategoryInterface} from "../src/interfaces/categories";
import {ProductInterface} from "../src/interfaces/product";

const api = request(app);
// USER
export const initialSignupData = {
  name: "test_1",
  email: "test_1@gmail.com",
  password: "123456789",
  password2: "123456789",
};
export const signupData = {
  name: "test_2",
  email: "test_2@gmail.com",
  password: "123456789",
  password2: "123456789",
};
export const signupWithoutEmail = {
  name: "test_2",
  password: "123456789",
  password2: "123456789",
};

export const signinData = {
  email: "test_1@gmail.com",
  password: "123456789",
};

// CATEGORIES
export const initialCategories = [
  {
    name: "Laptops",
    image: {
      url: "http://res.cloudinary.com/jilver-cloud/image/upload/v1656957186/tech-ecommerce/xjvcza2je2itewwvmopx.webp",
      public_id: "tech-ecommerce/xjvcza2je2itewwvmopx",
    },
  },
  {
    name: "Computers",
    image: {
      url: "http://res.cloudinary.com/jilver-cloud/image/upload/v1656957186/tech-ecommerce/xjvcza2je2itewwvmopx.webp",
      public_id: "tech-ecommerce/xjvcza2je2itewwvmopx",
    },
  },
];

// PRODUCTS
export const initialProducts = [
  {
    product_id: "",
    name: "IRB 1200",
    price: 35000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida leo fermentum tristique interdum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida leo fermentum tristique interdum. In dapibus elit vehicula, consequat elit efficitur, consequat massa. Nunc sit amet neque eu velit sagittis vestibulum.",
    image: {
      public_id: "tech-ecommerce/esz1xtlhobfwik18xjv2",
      url: "http://res.cloudinary.com/jilver-cloud/image/upload/v1656364237/tech-ecommerce/esz1xtlhobfwik18xjv2.webp",
    },
    category: "62ba131fb2caa09215cd17e1",
    sold: 20,
    stock: 2,
  },
  {
    product_id: "",
    name: "IRB 1600",
    price: 46000,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida leo fermentum tristique interdum",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam gravida leo fermentum tristique interdum. In dapibus elit vehicula, consequat elit efficitur, consequat massa. Nunc sit amet neque eu velit sagittis vestibulum.",
    image: {
      public_id: "tech-ecommerce/esz1xtlhobfwik18xjv2",
      url: "http://res.cloudinary.com/jilver-cloud/image/upload/v1656364237/tech-ecommerce/esz1xtlhobfwik18xjv2.webp",
    },
    category: "62ba131fb2caa09215cd17e1",
    sold: 7,
    stock: 15,
  },
];

export const getAllCategoriesDB = async () => {
  const response = await api.get("/api/categories");
  const contents = response.body.map(
    (category: CategoryInterface) => category.name,
  );
  return {
    contents,
    response,
  };
};

export const getAllProductsDB = async () => {
  const response = await api.get("/api/products");
  const contents = response.body.map(
    (product: ProductInterface) => product.name,
  );
  return {
    contents,
    response,
  };
};

export const serverOut = () => {
  const server = serverStart();
  mongoose.connection.close();
  server.close();
};

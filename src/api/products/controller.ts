import {Request, Response} from "express";
import {v4} from "uuid";
import {ProductInterface} from "../../interfaces/product";
import {Product} from "./model";

export const productsController = {
  getProdutcts: async (_req: Request, res: Response) => {
    try {
      const products = await Product.find();
      if (products.length < 1) {
        return res.status(400).json({message: "No product list found."});
      }
      return res.status(200).json(products);
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
      const {image, ...body}: ProductInterface = req.body;
      if (!image) {
        return res.status(400).json({message: "No image upload."});
      }

      const newProduct = new Product({
        image,
        ...body,
      });
      newProduct.product_id = v4();
      await newProduct.save();
      return res.status(201).json({
        message: "Product created successfully.",
        product: newProduct,
      });
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  getProductByID: async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(400).json({message: "Product not found"});
      }
      return res.status(200).json(product);
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  updateProductByID: async (req: Request, res: Response) => {
    const {id} = req.params;
    const state = req.body;
    try {
      const productToUpdate = await Product.findByIdAndUpdate(
        {_id: id},
        {...state},
      );
      if (!productToUpdate) {
        return res
          .status(400)
          .json({message: `Product with ID: ${id} not found`});
      }
      return res
        .status(200)
        .json({message: `Product with ID: ${id} updated successfully.`});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },

  removeProductByID: async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
      const product = await Product.findByIdAndRemove(id);
      if (!product) {
        return res
          .status(400)
          .json({message: `Product with ID: ${id} not found`});
      }
      return res
        .status(200)
        .json({message: `Product with ID: ${id} removed successfully.`});
    } catch (err) {
      return res
        .status(500)
        .json({message: "Error on DB, call an administrator."});
    }
  },
};

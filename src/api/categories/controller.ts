import { Request, Response } from "express";
import { Category } from "./model";

export const categoriesController = {
  getCategories: async (_req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      if (!categories) {
        return res.status(400).json({ message: "No categories on DB." });
      }
      return res.status(200).json({ categories });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  createCategory: async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const newCategory = new Category({ name });
      await newCategory.save();
      return res
        .status(200)
        .json({ message: `Category: ${name} created successfully.` });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  getCategoryByID: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const catetory = await Category.findById(id);
      if (!catetory) {
        return res
          .status(400)
          .json({ message: `Category with ID: ${id} not found.` });
      }
      return res.status(200).json({ catetory });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  deleteCategoryByID: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndRemove(id);
      return res
        .status(200)
        .json({ message: `Category with ID: ${id} removed successfully.` });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },

  updateCategoryByID: async (req: Request, res: Response) => {
    try {
      const state = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { ...state });
      return res.status(200).json({
        message: `Category with ID: ${req.params.id} updated successfully.`,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Error on DB, call an administrator." });
    }
  },
};
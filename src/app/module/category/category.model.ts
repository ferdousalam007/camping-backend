import { Schema, model } from "mongoose";
import { ICategory } from "./category.interface";

const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },
});

export const Category = model<ICategory>('Category', categorySchema);
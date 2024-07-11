
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Category } from "./category.model";
import { v4 as uuidv4 } from 'uuid';
import cloudinary from "../../utils/cloudinary";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createCategoryIntoDB = async (req: any, res: any) => {


    const parsedCategory = req.body;

    // Check for duplicate category name
    const existingCategory = await Category.findOne({ name: parsedCategory.name });
    if (existingCategory) {
        return res.status(400).json({ message: 'Category name already exists' });
    }

    // Validate image file
    if (!req.files || !req.files.image) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image = req.files.image as any; // Type assertion to any
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!validExtensions.includes(image.mimetype)) {
        return res.status(400).json({ message: 'Only JPEG, JPG, and PNG files are allowed' });
    }

    const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: 'campers-shop/categories',
        public_id: uuidv4(),
    });

    const newCategory = new Category({
        ...parsedCategory,
        imageUrl: result.secure_url,
    });
    const savedCategory = await newCategory.save();
    if (!savedCategory) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Something went wrong',
        );
    }
    return savedCategory;
};

const getAllCategoriesFromDB = async () => {
    const result = await Category.find();
    if (!result) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Something went wrong',
        );
    }
    return result;
};  

const getACategoryFromDB = async (id: string) => {
    const result = await Category.findById(id);
    if (!result) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Something went wrong',
        );
    }
    return result;
    
}
export const CategoryServices = {
    createCategoryIntoDB,
    getAllCategoriesFromDB,
    getACategoryFromDB
   
}
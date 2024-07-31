/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import mongoose from 'mongoose';
import { sendResponse } from '../../utils/sendResponse';
import cloudinary from '../../utils/cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { Category } from '../category/category.model';
import { Product } from './products.model';
import { TProduct } from './products.interface';
//create a product into database
const createProductIntoDB = async (req: any, res: any) => {
  const parsedProduct = req.body;
  if (!req.files || !req.files.image) {
    return res.status(400).json({ message: 'Image file is required' });
  }

  const image = req.files.image as any; // Type assertion to any
  const result = await cloudinary.uploader.upload(image.tempFilePath, {
    folder: 'campers-shop/products',
    public_id: uuidv4(),
  });

  const categoryExists = await Category.findById(parsedProduct.category);
  if (!categoryExists) {
    return res.status(400).json({ message: 'Category does not exist' });
  }

  const newProduct = new Product({
    ...parsedProduct,
    imageUrl: result.secure_url,
  });

  const newResult = (await newProduct.save()).populate('category');

  return newResult;
};

//get all product from database
const getAllProductsFromDB = async (req: any, res: any) => {
  const { search, category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (category) query.category = category;
  if (minPrice) query.price = { ...query.price, $gte: +minPrice };
  if (maxPrice) query.price = { ...query.price, $lte: +maxPrice };

  const total = await Product.countDocuments(query);
  const result = await Product.find(query).populate('category')
    .sort({ price: sort === 'asc' ? 1 : -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);


  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }

  return ({ result, total, page: +page, limit: +limit });

};

//get single product from database
const getAProductFromDB = async (id: string) => {
  const result = await Product.findById(id).populate('category');
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }
  return result;
}
//update product into database
const updateProductIntoDB = async (id: string, req: any, res: any) => {
  const parsedProduct = req.body;

  // Check if there's an image to upload
  if (req.files && req.files.image) {
    const image = req.files.image as any; 

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(image.tempFilePath, {
      folder: 'campers-shop/products',
      public_id: uuidv4(),
    });

    // Update the product with the new image URL
    parsedProduct.imageUrl = result.secure_url;
  }

  // Find the existing product by ID
  const productExists = await Product.findById(id);

  if (!productExists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Update the product with the new data
  const updatedProduct = await Product.findByIdAndUpdate(id, parsedProduct, {
    new: true, // Return the updated document
    runValidators: true, // Apply validators to the updated document
  }).populate('category');

  if (!updatedProduct) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }

  return updatedProduct;
};

//delete single products into database
const deleteProductFromDB=async(id:string)=>{
  const findProduct=await Product.findById(id);
  if(!findProduct){
    throw new AppError(httpStatus.NOT_FOUND,'Product not found');
  }
  const result =await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  // const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }
  return result;
}

// export all functions
export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};

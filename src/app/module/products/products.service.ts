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
const createProductIntoDB = async (req: any,res:any) => {
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

 const newResult= (await newProduct.save()).populate('category');

  return newResult;
};

//get all product from database
const getAllProductsFromDB = async () => {
  const result = await Product.find().populate('category');
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }
  return result;
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
  const categoryExists = await Category.findById(parsedProduct.category);
  if (!categoryExists) {
    return res.status(400).json({ message: 'Category does not exist' });
  }
  const result = await Product.findByIdAndUpdate(id, parsedProduct, {
    new: true,
  }).populate('category');
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
  updateProductIntoDB
};

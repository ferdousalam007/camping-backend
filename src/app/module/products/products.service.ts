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
  // return
  if (!req.files || !req.files.images) {
    return res.status(400).json({ message: 'Image files are required' });
  }

  let images = req.files.images as any[]; // Type assertion to array
  if (!Array.isArray(images)) {
    images = [images];
  }
  const imageUrls = await Promise.all(
    images.map(async (image: any) => {
      const result = await cloudinary.uploader.upload(image.tempFilePath, {
        folder: 'campers-shop/products',
        public_id: uuidv4(),
      });
      return result.secure_url;
    }),
  );

  const categoryExists = await Category.findById(parsedProduct.category);
  if (!categoryExists) {
    return res.status(400).json({ message: 'Category does not exist' });
  }

  const newProduct = new Product({
    ...parsedProduct,
    imageUrl: imageUrls, // Store an array of image URLs
  });

  const newResult = (await newProduct.save()).populate('category');

  return newResult;
};

//get all product from database
const getAllProductsFromDB = async (req: any, res: any) => {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 10,
  } = req.query;
  // const query: any = {};
  const query: any = { isDeleted: false };
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
  const result = await Product.find(query)
    .populate('category')
    .sort({ price: sort === 'asc' ? 1 : -1 })
    .skip((+page - 1) * +limit)
    .limit(+limit);

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }

  // Find the minimum and maximum priced products
  // Find the minimum and maximum prices from the results
  const minPriceProduct =
    result.length > 0
      ? Math.min(...result.map((product) => product.price))
      : null;
  const maxPriceProduct =
    result.length > 0
      ? Math.max(...result.map((product) => product.price))
      : null;

  return {
    result,
    total,
    minPriceProduct,
    maxPriceProduct,
    page: +page,
    limit: +limit,
  };
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
};
//update product into database
const updateProductIntoDB = async (id: string, req: any, res: any) => {
  const parsedProduct = req.body;

  // Check if there are images to upload
  if (req.files && req.files.images) {
    let images = req.files.images as any[];

    // Ensure images is an array
    if (!Array.isArray(images)) {
      images = [images];
    }

    // Upload each image to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (image: any) => {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: 'campers-shop/products',
          public_id: uuidv4(),
        });
        return result.secure_url;
      }),
    );

    // Update the product with the new array of image URLs
    parsedProduct.imageUrl = imageUrls;
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
const deleteProductFromDB = async (id: string) => {
  const findProduct = await Product.findById(id);
  if (!findProduct) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
  }
  const result = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  // const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong',
    );
  }
  return result;
};

// export all functions
export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getAProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};

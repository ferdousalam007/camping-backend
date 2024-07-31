import mongoose, { Schema } from 'mongoose';
import { TProduct } from './products.interface';

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category', 
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
    imageUrl:{
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false
    },
    recommended: {
      type: Boolean,
      default: false
    } ,
    isDeleted: {
      type: Boolean,
      default: false
    },
    totalSold: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

export const Product = mongoose.model<TProduct>('Product', productSchema);

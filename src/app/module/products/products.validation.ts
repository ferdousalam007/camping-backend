import { z } from 'zod';

//product create validation schema
export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    price: z.number().min(0),
    stock: z.number().min(0),
    description: z.string().min(1),
    category: z.string().min(1),
    ratings: z.number().min(0).max(5).optional(),
    imageUrl: z.any(),
    featured: z.boolean().optional(),
    recommended: z.boolean().optional(),
  }),
});
//product update validation schema
export const updatedProductValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    price: z.number().min(0).optional(),
    stock: z.number().min(0).optional(),
    description: z.string().min(1).optional(),
    category: z.string().min(1).optional(),
    ratings: z.number().min(0).max(5).optional(),
    imageUrl: z.any().optional(),
    featured: z.boolean().optional(),
    recommended: z.boolean().optional(),

  }),
});

export const productValidations = {
  createProductValidationSchema,
  updatedProductValidationSchema,
};

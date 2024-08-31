import { z } from 'zod';

// Adjust the validation schema to use the updated types
export const createOrderValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10),
    address: z.string().min(1),
    cartItems: z.array(
      z.object({
        id: z.string(),
        quantity: z.number().min(1),
      }),
    ),
    totalPrice: z.number().min(0),
  }),
});

export const orderValidations = {
  createOrderValidationSchema,
};

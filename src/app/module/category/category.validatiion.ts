import { z } from "zod";

export const createCategoryValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1),
        // imageUrl: z.string().url().min(1).max(1),
    }),
});
export const categoryValidations = {
  createCategoryValidationSchema,
};
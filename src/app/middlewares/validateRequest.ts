import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseData = (data: any) => {
  const parsedData = { ...data };

  // Convert relevant fields to numbers
  if (parsedData.price) parsedData.price = parseFloat(parsedData.price);
  if (parsedData.stock) parsedData.stock = parseInt(parsedData.stock, 10);
  if (parsedData.ratings) parsedData.ratings = parseFloat(parsedData.ratings);

  // Convert relevant fields to booleans
  if (parsedData.featured) parsedData.featured = parsedData.featured === 'true';
  if (parsedData.recommended)
    parsedData.recommended = parsedData.recommended === 'true';

  return parsedData;
};

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    req.body = parseData(req.body);
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });

    next();
  });
};

export default validateRequest;

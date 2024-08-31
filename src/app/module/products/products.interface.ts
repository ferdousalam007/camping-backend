import { Types } from 'mongoose';

//create type in typescript
export type TProduct = {
  name: string;
  price: number;
  stock: number;
  description?: string;
  category: Types.ObjectId;
  ratings: number;
  imageUrl: string[];
  featured?: boolean;
  recommended?: boolean;
  isDeleted?: boolean;
  totalSold?: number;
};

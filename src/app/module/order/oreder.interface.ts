import { Types } from 'mongoose';

// export type CartItem = {
//     id: Types.ObjectId;
//     quantity: number;
// };
// Separate the CartItem type definition
export type CartItem = {
    id: Types.ObjectId;
    quantity: number;
};
export type TOrder = {
    name: string;
    email: string;
    phone: string;
    address: string;
    cartItems: CartItem[];
    totalPrice: number;
};
import mongoose from "mongoose";
import { CartItem, TOrder } from "./oreder.interface";


const CartItemSchema = new mongoose.Schema<CartItem>({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

const OrderSchema = new mongoose.Schema<TOrder>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    cartItems: [CartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
    },
});

export const Order = mongoose.model<TOrder>('Order', OrderSchema);



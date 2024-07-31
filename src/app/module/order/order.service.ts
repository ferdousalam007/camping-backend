import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { Product } from '../products/products.model';
import { CartItem, TOrder } from './oreder.interface';
import { Order } from './order.model';
import mongoose from 'mongoose';


//create a order into database
// Update the createOrderIntoDB function to use the correct properties from orderData
const createOrderIntoDB = async (orderData: TOrder) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { cartItems, name, email, phone, address, totalPrice } = orderData;

        for (const item of cartItems) {
            const product = await Product.findById(item.id).session(session);
            if (product) {
                if (product.stock < item.quantity) {
                    throw new AppError(
                        httpStatus.BAD_REQUEST,
                        'Insufficient stock for product: ' + product.name,
                    );
                }
                product.stock -= item.quantity;
                product.totalSold = (product.totalSold || 0) + item.quantity; // Add the sold quantity
                await product.save({ session });
            } else {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'Product not found: ' + item.id,
                );
            }
        }

        const newOrder = new Order({
            cartItems: cartItems.map(item => ({ id: item.id, quantity: item.quantity })),
            name,
            email,
            phone,
            address,
            totalPrice,
        });

        const savedOrder = await newOrder.save({ session });



        await session.commitTransaction();
        session.endSession();

        return savedOrder;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
};



//get all orders from database
const getAllOredersFromDB = async () => {
    const result = await Order.find();
    if (!result) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            'Something went wrong',
        );
    }
    return result;
}
// export all functions
export const OrderService = {
    createOrderIntoDB,
    getAllOredersFromDB
};
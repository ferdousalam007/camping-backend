import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderService.createOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOredersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders fetched successfully',
    data: result,
  });
});
export const OrderController = {
  createOrder,
  getAllOrders,
};

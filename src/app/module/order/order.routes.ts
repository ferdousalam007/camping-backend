import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidations } from './order.validation';
import { OrderController } from './order.controller';
const router = express.Router();

//create order route
router.post(
  '/',
  validateRequest(orderValidations.createOrderValidationSchema),
  OrderController.createOrder,
);

//get all order route
router.get('/', OrderController.getAllOrders);
//export order routes
export const OrderRoutes = router;

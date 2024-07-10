import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { carValidations } from './products.validation';
import { carController } from './products.controller';
const router = express.Router();

//create car by admin route
router.post(
  '/',

  validateRequest(carValidations.createCarValidationSchema),
  carController.createCar,
);
//get all car by all
router.get('/', carController.getAllCars);

//return car by admin

//update car by admin
router.put(
  '/:id',

  validateRequest(carValidations.updatedCarValidationSchema),
  carController.updateCar,
);
//get single car by all
router.get('/:id', carController.getACar);

//delete car by admin
router.delete('/:id', carController.deleteACarIntoDB);

//export car routes
export const ProductRoutes = router;

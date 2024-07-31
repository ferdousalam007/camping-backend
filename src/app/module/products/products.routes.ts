import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './products.validation';
import { ProductController } from './products.controller';
const router = express.Router();

//create product route
router.post(
  '/',

  validateRequest(productValidations.createProductValidationSchema),
  ProductController.createProduct,
);
//get all product route
router.get('/', ProductController.getAllProducts);

//get single product route
router.get('/:id', ProductController.getAProduct);

//update product route
router.put(
  '/:id',
  validateRequest(productValidations.updatedProductValidationSchema),
  ProductController.updateProduct,
);
//delete product route
router.delete('/:id', ProductController.deleteProduct);

//delete product route
// router.delete('/:id', ProductController.deleteProduct);

//get all car by all
// router.get('/', carController.getAllCars);

//return car by admin

//update car by admin
// router.put(
//   '/:id',

//   validateRequest(productValidations.updatedProductValidationSchema),
//   carController.updateCar,
// );
//get single car by all
// router.get('/:id', carController.getACar);

//delete car by admin
// router.delete('/:id', carController.deleteACarIntoDB);

//export car routes
export const ProductRoutes = router;

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
//get all product without query
router.get('/all', ProductController.getAllProductsWithoutQuery);
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



//export car routes
export const ProductRoutes = router;

import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { categoryValidations } from './category.validatiion';
import { CategoryController } from './category.controller';
const router = express.Router();

//create category route
router.post(
    '/',
    validateRequest(categoryValidations.createCategoryValidationSchema),
    CategoryController.createCategory,
);
//get all category route
router.get('/', CategoryController.getAllCategories);

//get single category route
router.get('/:id', CategoryController.getACategory);

//export car routes
export const CategoryRoutes = router;

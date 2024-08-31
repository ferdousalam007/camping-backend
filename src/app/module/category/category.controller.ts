import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req, res);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const getACategory = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await CategoryServices.getACategoryFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getACategory,
};

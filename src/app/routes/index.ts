import { Router } from 'express';
import { CategoryRoutes } from '../module/category/category.routes';
import { ProductRoutes } from '../module/products/products.routes';

const router = Router();

const moduleRoutes = [
  
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

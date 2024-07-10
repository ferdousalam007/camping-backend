import { Router } from 'express';
import { ProductRoutes } from '../module/products/products.routes';

const router = Router();

const moduleRoutes = [
  
  {
    path: '/cars',
    route: ProductRoutes,
  },
  // {
  //   path: '/bookings',
  //   route: BookingRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));
// application routes
app.use('/api', router);
// Route handler for the root URL ('/')
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome camping backend :)');
});
app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import articlesRoutes from '../routes/articles'; 
import { router as specialRoutes } from '../routes/special'; 


const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(articlesRoutes.routes());
app.use(articlesRoutes.allowedMethods());
app.use(specialRoutes.routes());
app.use(specialRoutes.allowedMethods());

export default app;

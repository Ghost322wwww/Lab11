import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'; 
import router from './routes/articles'; 
import { router as specialRoutes } from './routes/special';  

const app = new Koa();
app.use(cors());   
app.use(bodyParser());


app.use(router.routes());
app.use(router.allowedMethods());

app.use(specialRoutes.routes());          
app.use(specialRoutes.allowedMethods()); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

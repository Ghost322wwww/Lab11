import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import articleRoutes from './routes/articles';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

// 路由設定
router.get('/articles', articleRoutes.getAll);
router.get('/articles/:id', articleRoutes.getById);  
router.post('/articles', articleRoutes.createArticle);

app.use(router.routes());
app.use(router.allowedMethods());

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

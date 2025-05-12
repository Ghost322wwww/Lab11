import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';
import * as articleRoutes from './routes/articles';

const app = new Koa();
const router = new Router();

// 中介層
app.use(bodyParser());

// 註冊文章路由（/articles）
router.get('/articles', articleRoutes.getAll);
router.get('/articles/:id', articleRoutes.getById);
router.post('/articles', articleRoutes.createArticle);

// 註冊 router 到 app
app.use(router.routes());
app.use(router.allowedMethods());

// 啟動伺服器
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

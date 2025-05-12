import Router from '@koa/router';
import { RouterContext } from '@koa/router';
import * as model from '../models/articles';

const router = new Router();

const getAll = async (ctx: RouterContext, next: any) => {
  let articles = await model.getAll();
  ctx.body = articles.length ? articles : {};
  await next();
};

const getById = async (ctx: RouterContext, next: any) => {
  let id = ctx.params.id;
  let article = await model.getById(id);
  if (article.length) {
    ctx.body = article[0];
  } else {
    ctx.status = 404;
  }
  await next();
};

const createArticle = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
};

// Define the routes
router.get('/articles', getAll);
router.get('/articles/:id', getById);
router.post('/articles', createArticle);

export default router;

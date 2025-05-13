import Router from '@koa/router';
import { RouterContext } from '@koa/router';
import * as model from '../models/articles';
import { basicAuth } from '../controllers/auth';
import { validateArticle } from '../controllers/validation';
import bodyParser from 'koa-bodyparser'; 


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
  console.log("Received article information: ", body);
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

const updateArticle = async (ctx: RouterContext, next: any) => {
  const body = ctx.request.body;
  const id = parseInt(ctx.params.id);
  const result = await model.update(id, body);
  if (result.status == 200) {
    ctx.body = { message: "Article updated successfully" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "update failed" };
  }
  await next();
};

const deleteArticle = async (ctx: RouterContext, next: any) => {
  const id = parseInt(ctx.params.id);
  const result = await model.del(id);
  if (result.status == 200) {
    ctx.body = { message: "Article deleted successfully" };
  } else {
    ctx.status = 500;
    ctx.body = { err: "delete failed" };
  }
  await next();
};

// Define the routes
router.get('/articles', getAll);
router.get('/articles/:id', getById);
router.post('/articles', basicAuth, bodyParser(), validateArticle, createArticle);
router.put('/articles/:id', basicAuth, bodyParser(), validateArticle, updateArticle);
router.delete('/articles/:id', basicAuth, deleteArticle);

export default router;

import Router, { RouterContext } from '@koa/router';
import { basicAuth } from '../controllers/auth';

const router = new Router({ prefix: '/api/v1' });

router.get('/', async (ctx: RouterContext, next) => {
  ctx.body = {
    message: 'Public API return',
  };
  await next();
});

router.get('/private', basicAuth, async (ctx: RouterContext, next) => {
  ctx.body = {
    message: 'This is a protected route!',
    user: ctx.state.user || 'unknown',
  };
  await next();
});

export { router };

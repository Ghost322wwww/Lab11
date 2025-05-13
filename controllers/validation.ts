import { Validator, ValidationError } from 'jsonschema';
import { RouterContext } from '@koa/router';
import { article } from '../schemas/article.schema';

const v = new Validator();

export const validateArticle = async (ctx: RouterContext, next: any) => {
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  };
  const body = ctx.request.body;

  try {
    v.validate(body, article, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        message: 'Validation failed',
        errors: error.stack
      };
    } else {
      throw error;
    }
  }
};

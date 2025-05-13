import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "@koa/router";
import * as users from '../models/users';  

const verifyPassword = (user: any, password: string) => {
  return user.password === password;
}

passport.use(new BasicStrategy(async (username, password, done) => {
  let result: any[] = [];
  try {
    result = await users.findByUsername(username);
    console.log("Query results：", result);
  } catch (error) {
    console.error(`Error during authentication for user ${username}: ${error}`);
    return done(null, false);
  }

  if (result.length) {
    const user = result[0];
    if (verifyPassword(user, password)) {
      return done(null, { user: user });
    } else {
      console.log(`Password incorrect for ${username}`);
      return done(null, false);
    }
  } else {
    console.log(`No user found with username ${username}`);
    return done(null, false);
  }
}));

export const basicAuth = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false })(ctx, next);
  if (ctx.status == 401) {
    ctx.body = { message: 'you are not authorized' };
  } else {
    ctx.body = { message: 'you are passed' };
  }
};

import { MiddlewareFn } from "type-graphql";

import Context from "../../types/Context";

const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error("not auth");
  }

  return next();
};

export default isAuth;

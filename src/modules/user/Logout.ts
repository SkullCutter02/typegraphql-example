import { Ctx, Mutation, Resolver } from "type-graphql";

import Context from "../../types/Context";

@Resolver()
export default class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: Context): Promise<boolean> {
    return new Promise((resolve, reject) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }

        ctx.res.clearCookie("qid");
        return resolve(true);
      })
    );
  }
}

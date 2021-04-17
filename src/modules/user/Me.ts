import { Ctx, Query, Resolver } from "type-graphql";

import User from "../../entity/User";
import Context from "../../types/Context";

@Resolver()
export default class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: Context): Promise<User | undefined | null> {
    if (!ctx.req.session!.userId) return null;

    return await User.findOneOrFail({ id: ctx.req.session!.userId });
  }
}

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

import User from "../../entity/User";
import Context from "../../types/Context";
import redis from "../../redis";
import { confirmUserPrefix } from "../constants/redisPrefixes";

@Resolver()
export default class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string, @Ctx() ctx: Context): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);
    if (!userId) return false;

    await User.update({ id: parseInt(userId) }, { confirmed: true });
    await redis.del(confirmUserPrefix + userId);

    return true;
  }
}

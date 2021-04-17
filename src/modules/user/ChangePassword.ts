import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";

import ChangePasswordInput from "./changePassword/ChangePasswordInput";
import User from "../../entity/User";
import redis from "../../redis";
import { forgotPasswordPrefix } from "../constants/redisPrefixes";
import Context from "../../types/Context";

@Resolver()
export default class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg("data") { token, password }: ChangePasswordInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const userId = await redis.get(forgotPasswordPrefix + token);
    if (!userId) return null;

    const user = await User.findOne({ id: parseInt(userId) });
    if (!user) return null;

    await redis.del(forgotPasswordPrefix + token);

    user.password = await bcrypt.hash(password, 12);
    await user.save();

    ctx.req.session!.userId = user.id;

    return user;
  }
}

import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import * as bcrypt from "bcryptjs";

import User from "../../entity/User";
import Context from "../../types/Context";

@Resolver()
export default class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = await User.findOne({ email });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return null;

    if (!user.confirmed) return null;

    ctx.req.session!.userId = user.id;

    return user;
  }
}

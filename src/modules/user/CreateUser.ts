import { Arg, ClassType, Field, InputType, Mutation, Resolver, UseMiddleware } from "type-graphql";

import User from "../../entity/User";
import RegisterInput from "./register/RegisterInput";
import Product from "../../entity/Product";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";

function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: `create${suffix}` })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: typeof inputType) {
      return entity.create(data).save();
    }
  }

  return BaseResolver;
}

@InputType()
class ProductInput {
  @Field()
  name: string;
}

const BaseCreateUser = createBaseResolver("User", User, RegisterInput, User);
const BaseCreateProduct = createBaseResolver("Product", Product, ProductInput, Product);

@Resolver()
class CreateProductResolver extends BaseCreateProduct {}

@Resolver()
export default class CreateUserResolver extends BaseCreateUser {}

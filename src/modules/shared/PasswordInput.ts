import { Field, InputType } from "type-graphql";
import { MinLength } from "class-validator";

@InputType()
export default class PasswordInput {
  @Field()
  @MinLength(5)
  password: string;
}

import { Resolver, Arg, Mutation } from "type-graphql";
import { User } from "../sql/entities/User";
import argon2 from "argon2";

@Resolver(User)
export class UserMutations {
  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("role") role: string
  ): Promise<User> {
    const hashPassword: string = await argon2.hash(password);
    const user = new User(email, role, hashPassword);
    await user.save();

    return user;
  }
}

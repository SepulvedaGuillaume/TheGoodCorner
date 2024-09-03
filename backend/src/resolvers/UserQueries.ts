import { Resolver, Arg, Query } from "type-graphql";
import { User } from "../sql/entities/User";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

@Resolver(User)
export class UserQueries {
  @Query(() => String)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<string> {
    const user = await User.findOneOrFail({ where: { email: email } });

    const isValid: boolean = await argon2.verify(user.passwordHashed, password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ email: email, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    return token;
  }
}

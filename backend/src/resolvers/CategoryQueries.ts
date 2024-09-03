import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import {Category} from "../sql/entities/Category";
import {Ad} from "../sql/entities/Ad";

@Resolver(Category)
export class CategoryQueries {
  @FieldResolver(() => [Ad])
  async ads(@Root() category: Category): Promise<Ad[]> {
    try {
      const ads = await Ad.find({
        where: { category },
      });
      return ads;
    } catch (error) {
      console.error("Failed to fetch ads for category:", error);
      throw new Error("Failed to fetch ads for category");
    }
  }

  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    console.log("getAllCategories from graphql");
    const categories: Category[] = await Category.find();
    return categories;
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: string): Promise<Category> {
    console.log("getCategoryById from graphql");
    const category: Category = await Category.findOne({
      where: { id },
    });
    return category;
  }
}

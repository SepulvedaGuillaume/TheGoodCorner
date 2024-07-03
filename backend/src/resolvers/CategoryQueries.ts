import { Resolver, Query } from "type-graphql";
import Category from "../sql/entities/Category";

@Resolver(Category)
export class CategoryQueries {
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    console.log("getAllCategories from graphql");
    const categories: Category[] = await Category.find();
    return categories;
  }
}

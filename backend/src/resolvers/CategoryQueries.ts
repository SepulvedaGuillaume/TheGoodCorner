import { Resolver, Query, Arg, FieldResolver, Root, Authorized } from "type-graphql";
import { Category } from "../sql/entities/Category";
import { Ad } from "../sql/entities/Ad";

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

  @Authorized("ADMIN", "USER")
  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    console.log("getAllCategories from graphql");
    const categories: Category[] = await Category.find();
    return categories;
  }

  @Authorized("ADMIN", "USER")
  @Query(() => Category)
  async getCategoryById(@Arg("id") id: string): Promise<Category> {
    console.log("getCategoryById from graphql");
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new Error("Invalid ID format");
      }
      const category = await Category.findOne({
        where: { id: numericId },
      });
      if (!category) {
        throw new Error("Category not found");
      }
      return category;
    } catch (error) {
      console.error("Failed to fetch category by id:", error);
      throw new Error("Failed to fetch category by id");
    }
  }
}

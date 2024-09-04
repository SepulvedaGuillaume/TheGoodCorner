import { Resolver, Query, Authorized } from "type-graphql";
import { Tag } from "../sql/entities/Tag";

@Resolver(Tag)
export class TagsQueries {
  @Authorized("ADMIN", "USER")
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    console.log("getAllTags from graphql");
    const tags: Tag[] = await Tag.find();
    return tags;
  }
}

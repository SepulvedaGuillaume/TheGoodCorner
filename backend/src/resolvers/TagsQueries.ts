import { Resolver, Query } from "type-graphql";
import Tag from "../sql/entities/Tag";

@Resolver(Tag)
export class TagsQueries {
  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    console.log("getAllTags from graphql");
    const tags: Tag[] = await Tag.find();
    return tags;
  }
}

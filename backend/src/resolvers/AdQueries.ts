import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  Authorized,
} from "type-graphql";
import { Ad } from "../sql/entities/Ad";
import { Tag } from "../sql/entities/Tag";
import { In, Like } from "typeorm";
import DataLoader from "dataloader";

const tagsDataLoader = new DataLoader((ids) => {
  return Tag.findBy({
    id: In(ids),
  });
});

@Resolver(Ad)
export class AdQueries {
  @FieldResolver()
  async tags(@Root() ad: Ad): Promise<(Tag | Error)[]> {
    if (ad.tagIds == null || ad.tagIds.length == 0) {
      return [];
    }
    return tagsDataLoader.loadMany(ad.tagIds);
  }

  @Authorized("ADMIN", "USER")
  @Query(() => [Ad])
  async getAllAds(): Promise<Ad[]> {
    console.log("getAllAds from graphql");
    const ads: Ad[] = await Ad.find();
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: string): Promise<Ad> {
    console.log("getAdById from graphql");
    const ad: Ad = await Ad.findOne({
      where: { id: parseInt(id) },
    });
    return ad;
  }

  @Query(() => [Ad])
  async searchAds(@Arg("searchTerm") searchTerm: string): Promise<Ad[]> {
    console.log(`searchAds from graphql with searchTerm: ${searchTerm}`);
    const ads: Ad[] = await Ad.find({
      where: [
        { title: Like(`%${searchTerm}%`) },
        { category: { name: Like(`%${searchTerm}%`) } },
      ],
    });
    return ads;
  }
}

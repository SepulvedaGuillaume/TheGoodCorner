import { Resolver, Query, FieldResolver, Root, Arg } from "type-graphql";
import Ad from "../sql/entities/Ad";
import Tag from "../sql/entities/Tag";
import { In } from "typeorm";
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

  @Query(() => [Ad])
  async getAllAds(): Promise<Ad[]> {
    console.log("getAllAds from graphql");
    const ads: Ad[] = await Ad.find();
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: number): Promise<Ad> {
    console.log("getAd from graphql");
    const ad: Ad = await Ad.findOne({
      where: { id },
    });
    return ad;
  }
}

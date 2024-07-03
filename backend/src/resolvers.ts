import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Arg,
  Mutation,
  InputType,
  Field,
  ID,
} from "type-graphql";
import Ad from "./sql/entities/Ad";
import Category from "./sql/entities/Category";
import Tag from "./sql/entities/Tag";
import { DeepPartial, In } from "typeorm";
import DataLoader from "dataloader";

const tagsDataLoader = new DataLoader((ids) => {
  return Tag.findBy({
    id: In(ids),
  });
});

@InputType({ description: "New ad data" })
class AdInput implements Partial<Ad> {
  @Field((type) => ID, { defaultValue: Math.floor(Math.random() * 1000) })
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field({ nullable: true })
  picture?: string;

  @Field()
  location: string;

  @Field((type) => Date, { defaultValue: new Date() })
  createdAt: Date;

  @Field((type) => CategoryInput)
  category: Category;

  @Field((type) => [TagInput])
  tags: Tag[];
}

@InputType({ description: "Update ad data" })
class UpdateAdInput implements Partial<Ad> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field((type) => CategoryInput, { nullable: true })
  category?: Category;

  @Field((type) => [TagInput], { nullable: true })
  tags?: Tag[];
}

@InputType({ description: "New category data" })
class CategoryInput implements Partial<Category> {
  @Field((type) => ID)
  id: number;
}

@InputType({ description: "New tag data" })
class TagInput implements Partial<Tag> {
  @Field((type) => ID)
  id: number;
}

@Resolver(Ad)
export class AdResolver {
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

  @Mutation(() => Ad)
  async createAd(@Arg("data") newAd: AdInput): Promise<Ad> {
    console.log("createAd from graphql");

    const category = await Category.findOne({
      where: { id: newAd.category.id },
    });
    if (!category) {
      throw new Error(`Category with id ${newAd.category.id} not found`);
    }

    const tags = await Tag.find({
      where: { id: In(newAd.tags.map((tag) => tag.id)) },
    });
    if (tags.length !== newAd.tags.length) {
      throw new Error("One or more tags not found");
    }

    const ad = Ad.create({
      ...newAd,
      category,
      tags,
    } as DeepPartial<Ad>);

    await ad.save();
    return ad;
  }

  @Mutation(() => Ad)
  async updateAd(
    @Arg("id") id: number,
    @Arg("data") updatedAd: UpdateAdInput
  ): Promise<Ad> {
    console.log("updateAd from graphql");

    const ad = await Ad.findOne({ where: { id } });
    if (!ad) {
      throw new Error(`Ad with id ${id} not found`);
    }

    if (updatedAd.category) {
      const category = await Category.findOne({
        where: { id: updatedAd.category.id },
      });
      if (!category) {
        throw new Error(`Category with id ${updatedAd.category.id} not found`);
      }
    }

    if (updatedAd.tags) {
      const tags = await Tag.find({
        where: { id: In(updatedAd.tags.map((tag) => tag.id)) },
      });
      if (tags.length !== updatedAd.tags.length) {
        throw new Error("One or more tags not found");
      }
    }

    const adUpdated = Ad.create({
      ...ad,
      ...updatedAd,
    });

    await adUpdated.save();
    return adUpdated;
  }

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number): Promise<string> {
    console.log("deleteAd from graphql");

    const ad = await Ad.findOne({ where: { id } });

    if (!ad) {
      throw new Error(`Ad with id ${id} not found`);
    }

    await ad.remove();
    return `Ad with id ${id} deleted`;
  }
}

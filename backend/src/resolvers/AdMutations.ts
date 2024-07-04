import {
  Resolver,
  Arg,
  Mutation,
  InputType,
  Field,
  ID,
} from "type-graphql";
import Ad from "../sql/entities/Ad";
import Category from "../sql/entities/Category";
import Tag from "../sql/entities/Tag";
import { DeepPartial, In } from "typeorm";

@InputType({ description: "New ad data" })
class AdInput implements Partial<Ad> {
  @Field((type) => ID, { defaultValue: Math.floor(Math.random() * 1000) })
  id: string;

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
  id: string;
}

@InputType({ description: "New tag data" })
class TagInput implements Partial<Tag> {
  @Field((type) => ID)
  id: string;
}

@Resolver(Ad)
export class AdMutations {
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
    @Arg("id") id: string,
    @Arg("data") updatedAd: UpdateAdInput
  ): Promise<Ad> {
    console.log("updateAd from graphql");
  
    const ad = await Ad.findOne({ where: { id } });
    if (!ad) {
      throw new Error(`Ad with id ${id} not found`);
    }
  
    if (updatedAd.category) {
      let category = await Category.findOne({
        where: { name: updatedAd.category.name },
      });
      if (!category) {
        category = Category.create({ name: updatedAd.category.name });
        await category.save();
      }
      updatedAd.category = category;
    }
  
    if (updatedAd.tags) {
      const tagNames = updatedAd.tags.map(tag => tag.name);
      let tags = await Tag.find({ where: { name: In(tagNames) } });
  
      // Create any missing tags
      const existingTagNames = tags.map(tag => tag.name);
      const newTagNames = tagNames.filter(name => !existingTagNames.includes(name));
      const newTags = newTagNames.map(name => Tag.create({ name }));
  
      await Tag.save(newTags);
      tags = tags.concat(newTags);
      
      updatedAd.tags = tags;
    }
  
    const adUpdated = Ad.create({
      ...ad,
      ...updatedAd,
    });
  
    await adUpdated.save();
    return adUpdated;
  }
  

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: string): Promise<string> {
    console.log("deleteAd from graphql");

    const ad = await Ad.findOne({ where: { id } });

    if (!ad) {
      throw new Error(`Ad with id ${id} not found`);
    }

    await ad.remove();
    return `Ad with id ${id} deleted`;
  }
}

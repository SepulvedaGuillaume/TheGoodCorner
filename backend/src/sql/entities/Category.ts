import { Length } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import Ad from "./Ad";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
class Category extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field()
  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  name: string;

  @Field((type) => [Ad])
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}

export default Category;
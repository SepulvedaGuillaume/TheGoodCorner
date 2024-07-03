import { Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import Ad from "./Ad";
import { Field, ID, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
class Tag extends BaseEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  name: string;

  @Field((type) => [Ad])
  @ManyToMany(() => Ad, (ad) => ad.tags, { onDelete: "CASCADE" })
  ads: Ad[];
}

export default Tag;

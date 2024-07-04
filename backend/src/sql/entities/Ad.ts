import { Length } from "class-validator";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  RelationId,
} from "typeorm";
import Category from "./Category";
import Tag from "./Tag";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: string;

  @Field()
  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  title: string;

  @Field({ nullable: true })
  @Column({
    length: 255,
    nullable: true,
  })
  @Length(1, 255, {
    message: "Entre 1 et 255 caractères",
  })
  description?: string;

  @Field()
  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  owner: string;

  @Field()
  @Column()
  price: number;

  @Field({ nullable: true })
  @Column({
    nullable: true,
  })
  picture?: string;

  @Field()
  @Column({
    length: 100,
  })
  @Length(1, 100, {
    message: "Entre 1 et 100 caractères",
  })
  location: string;

  @Field((type) => Date, { nullable: true })
  @Column("datetime")
  createdAt?: Date;

  @Field((type) => Category)
  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category: Category;

  @Field((type) => [Tag])
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.ads, { onDelete: "CASCADE", eager: true })
  tags?: Tag[];

  @RelationId("tags")
  tagIds?: number[];
}

export default Ad;

import { DataSource } from "typeorm";
import { Ad } from "./entities/Ad";
import { Category } from "./entities/Category";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { pool } from "./configSql";

export const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "thegoodcorner",
  entities: [Ad, Category, Tag, User],
  synchronize: true,
  logging: true,
});

export async function cleanDB() {
  try {
    console.log("Cleaning the database...");

    const cleanScript = `
      DROP TABLE IF EXISTS ad_tags_tag;
      DROP TABLE IF EXISTS ad;
      DROP TABLE IF EXISTS tag;
      DROP TABLE IF EXISTS category;
      DROP TABLE IF EXISTS "user";
    `;

    await pool.query(cleanScript);
    console.log("Database cleaned successfully.");
  } catch (error) {
    console.error("Error cleaning the database:", error);
  }
}

export async function initTestData() {
  try {
    console.log("Initializing test data...");

    const initScript = `
      -- Create category table
      CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );

      -- Insert categories
      INSERT INTO category (name) VALUES
      ('vetement'),
      ('informatique'),
      ('jeux vidéos'),
      ('maison'),
      ('voiture'),
      ('nature'),
      ('vélo'),
      ('musique'),
      ('sport'),
      ('autre');

      -- Create tag table
      CREATE TABLE tag (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      );

      -- Insert tags
      INSERT INTO tag (name) VALUES
      ('neuf'),
      ('bon état'),
      ('état correct');

      -- Create ad table
      CREATE TABLE ad (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        owner VARCHAR(255) NOT NULL,  
        price INT NOT NULL,
        picture VARCHAR(255),
        location VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        categoryId INT NOT NULL,
        FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE CASCADE
      );

      -- Insert ads (example values; you should replace with actual data)
      INSERT INTO ad (title, description, owner, price, picture, location, createdAt, categoryId) VALUES
      ('Ad Title 1', 'Description 1', 'Owner 1', 100, 'pic1.jpg', 'Location 1', CURRENT_TIMESTAMP, 1),
      ('Ad Title 2', 'Description 2', 'Owner 2', 200, 'pic2.jpg', 'Location 2', CURRENT_TIMESTAMP, 2),
      ('Ad Title 3', 'Description 3', 'Owner 3', 300, 'pic3.jpg', 'Location 3', CURRENT_TIMESTAMP, 3),
      ('Ad Title 4', 'Description 4', 'Owner 4', 400, 'pic4.jpg', 'Location 4', CURRENT_TIMESTAMP, 4),
      ('Ad Title 5', 'Description 5', 'Owner 5', 500, 'pic5.jpg', 'Location 5', CURRENT_TIMESTAMP, 5),
      ('Ad Title 6', 'Description 6', 'Owner 6', 600, 'pic6.jpg', 'Location 6', CURRENT_TIMESTAMP, 6),
      ('Ad Title 7', 'Description 7', 'Owner 7', 700, 'pic7.jpg', 'Location 7', CURRENT_TIMESTAMP, 7),
      ('Ad Title 8', 'Description 8', 'Owner 8', 800, 'pic8.jpg', 'Location 8', CURRENT_TIMESTAMP, 8),
      ('Ad Title 9', 'Description 9', 'Owner 9', 900, 'pic9.jpg', 'Location 9', CURRENT_TIMESTAMP, 9),
      ('Ad Title 10', 'Description 10', 'Owner 10', 1000, 'pic10.jpg', 'Location 10', CURRENT_TIMESTAMP, 10),
      ('Ad Title 11', 'Description 11', 'Owner 11', 1100, 'pic11.jpg', 'Location 11', CURRENT_TIMESTAMP, 1),
      ('Ad Title 12', 'Description 12', 'Owner 12', 1200, 'pic12.jpg', 'Location 12', CURRENT_TIMESTAMP, 2),
      ('Ad Title 13', 'Description 13', 'Owner 13', 1300, 'pic13.jpg', 'Location 13', CURRENT_TIMESTAMP, 3),
      ('Ad Title 14', 'Description 14', 'Owner 14', 1400, 'pic14.jpg', 'Location 14', CURRENT_TIMESTAMP, 4),
      ('Ad Title 15', 'Description 15', 'Owner 15', 1500, 'pic15.jpg', 'Location 15', CURRENT_TIMESTAMP, 5),
      ('Ad Title 16', 'Description 16', 'Owner 16', 1600, 'pic16.jpg', 'Location 16', CURRENT_TIMESTAMP, 6),
      ('Ad Title 17', 'Description 17', 'Owner 17', 1700, 'pic17.jpg', 'Location 17', CURRENT_TIMESTAMP, 7),
      ('Ad Title 18', 'Description 18', 'Owner 18', 1800, 'pic18.jpg', 'Location 18', CURRENT_TIMESTAMP, 8),
      ('Ad Title 19', 'Description 19', 'Owner 19', 1900, 'pic19.jpg', 'Location 19', CURRENT_TIMESTAMP, 9),
      ('Ad Title 20', 'Description 20', 'Owner 20', 2000, 'pic20.jpg', 'Location 20', CURRENT_TIMESTAMP, 10);

      -- Create ad_tags_tag table
      CREATE TABLE ad_tags_tag (
        adId INT NOT NULL,
        tagId INT NOT NULL,
        PRIMARY KEY (adId, tagId),
        FOREIGN KEY (adId) REFERENCES ad(id) ON DELETE CASCADE,
        FOREIGN KEY (tagId) REFERENCES tag(id) ON DELETE CASCADE
      );

      INSERT INTO ad_tags_tag (adId, tagId) VALUES
      (1, 2),
      (2, 1),
      (3, 3),
      (4, 2),
      (5, 1),
      (6, 3),
      (7, 2),
      (8, 3),
      (9, 1),
      (10, 2),
      (11, 1),
      (12, 3),
      (13, 1),
      (14, 2),
      (15, 3),
      (16, 1),
      (17, 2),
      (18, 3),
      (19, 1),
      (20, 2);

      -- Create user table
      CREATE TABLE "user" (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      role VARCHAR(255) NOT NULL,
      passwordHashed TEXT NOT NULL
    );
    `;

    await pool.query(initScript);
    console.log("Test data initialized successfully.");
  } catch (error) {
    console.error("Error initializing test data:", error);
  }
}

import db from "./sql/configSql";
import fs from "fs";
import path from "path";
import dataSource from "./sql/dataSource";
import "reflect-metadata";
import startApolloServer from "./startApollo";

const queries = fs.readFileSync(
  path.join(__dirname, "./sql/queries.sql"),
  "utf8"
);

db.exec(queries, (err: Error) => {
  if (err) {
    console.error("Error executing the SQL script:", err.message);
  } else {
    console.log("Database initialized successfully.");
  }
});

dataSource
  .initialize()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

startApolloServer();

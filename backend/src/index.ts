import client from "./sql/configSql";
import fs from "fs";
import path from "path";
import dataSource from "./sql/dataSource";
import "reflect-metadata";
import startApolloServer from "./startApollo";

const queries = fs.readFileSync(
  path.join(__dirname, "./sql/queries.sql"),
  "utf8"
);

client.query(queries, (err) => {
  if (err) {
    console.error("Erreur lors de l'execution du script SQL:", err.message);
  } else {
    console.log("Script SQL exécuté avec succès");
  }
  client.end();
});

dataSource
  .initialize()
  .then(() => {
    console.log("Datasource initialisée avec succès");
  })
  .catch((error) => {
    console.error("Erreur lors de l'initalisation de la Datasource ", error);
  });

startApolloServer();

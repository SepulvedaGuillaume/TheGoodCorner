import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "thegoodcorner",
  entities: ["src/sql/entities/*.ts"],
  synchronize: true,
  logging: true
});

export default dataSource;
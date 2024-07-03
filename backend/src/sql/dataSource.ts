import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "sqlite",
  database: "src/sql/good_corner.sqlite",
  entities: ["src/sql/entities/*.ts"],
  synchronize: true,
  // logging: true
});

export default dataSource;

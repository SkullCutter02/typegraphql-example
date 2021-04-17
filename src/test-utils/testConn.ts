import { createConnection } from "typeorm";

const testConn = (drop: boolean = false) => {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "",
    database: "typegraphql_db_test",
    synchronize: true,
    logging: false,
    dropSchema: drop,
    entities: [__dirname + "/../entity/**/*.ts"],
  });
};

export default testConn;

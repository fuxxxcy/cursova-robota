import { db_config } from "./config/db.config";
import knex from "knex";

export const Database = knex({
  client: 'mssql',
  connection: {
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.db,
  },
});
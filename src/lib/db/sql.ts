import * as dotenv from "dotenv";

import path from "path";
import postgres from "postgres";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.error("Database connection string is missing in .env.local");
}

const globalForSql = global as unknown as { sql: ReturnType<typeof postgres> };

export const sql =
  globalForSql.sql ||
  postgres(connectionString!, {
    ssl: "require",
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") globalForSql.sql = sql;

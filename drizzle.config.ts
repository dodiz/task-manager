import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DB_URL) throw new Error("DB_URL not set");

const config = {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DB_URL,
  },
} satisfies Config;

export default config;

import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DATABASE_URI) throw new Error("DATABASE_URI not set");
if (!process.env.DATABASE_AUTH_TOKEN)
  throw new Error("DATABASE_AUTH_TOKEN not set");

const config = {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URI!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;

export default config;

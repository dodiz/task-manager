import type { Config } from "drizzle-kit";

const config = {
  schema: "./server/db/Boards.schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "sqlite.db",
  },
} satisfies Config;

export default config;

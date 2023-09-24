import type { Config } from "drizzle-kit";

const config = {
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: "postgres://admin:admin@localhost:5432/task-manager",
  },
} satisfies Config;

export default config;

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/server/db/schema";
import { env } from "@/env.mjs";

const client = postgres(env.DB_URL);
const db = drizzle(client, { schema, logger: true });

/**
 * @todo check migration
 * import { migrate } from "drizzle-orm/better-sqlite3/migrator";
 * migrate(db, { migrationsFolder: "./drizzle" });
 */

export { db };

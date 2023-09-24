import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/server/db/schema";
import { env } from "@/env.mjs";

const db = drizzle(postgres(env.DB_URL), { schema });

/**
 * @todo check migration
 * import { migrate } from "drizzle-orm/better-sqlite3/migrator";
 * migrate(db, { migrationsFolder: "./drizzle" });
 */

export { db };

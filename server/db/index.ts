import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@/server/db/schema";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite, { schema });
/**
 * @todo check migration
 * import { migrate } from "drizzle-orm/better-sqlite3/migrator";
 * migrate(db, { migrationsFolder: "./drizzle" });
 */

export { db };

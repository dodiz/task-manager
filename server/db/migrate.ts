import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from ".";

const migrateDB = async () => {
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("db migrated successfully");
};

migrateDB();

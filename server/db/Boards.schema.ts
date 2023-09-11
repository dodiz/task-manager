import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Boards = sqliteTable("boards", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

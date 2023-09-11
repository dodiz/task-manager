import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const boards = sqliteTable("boards", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const columns = sqliteTable("columns", {
  id: integer("id").primaryKey(),
  name: text("name"),
  boardId: integer("board_id").references(() => boards.id),
});

export const BoardsRelations = relations(boards, ({ many }) => ({
  columns: many(columns),
}));

export const ColumnsRelations = relations(columns, ({ one }) => ({
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
}));

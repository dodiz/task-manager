import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const boards = sqliteTable("boards", {
  id: integer("id").primaryKey(),
  name: text("name"),
});

export const columns = sqliteTable("columns", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  boardId: integer("board_id")
    .references(() => boards.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  columnId: integer("column_id")
    .references(() => columns.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const subTasks = sqliteTable("sub_task", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  taskId: integer("task_id").references(() => tasks.id, {
    onDelete: "cascade",
  }),
});

export const boardsRelations = relations(boards, ({ many }) => ({
  columns: many(columns),
}));

export const columnsRelations = relations(columns, ({ one, many }) => ({
  board: one(boards, {
    fields: [columns.boardId],
    references: [boards.id],
  }),
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one, many }) => ({
  column: one(columns, {
    fields: [tasks.columnId],
    references: [columns.id],
  }),
  subTasks: many(subTasks),
}));

export const subTasksRelations = relations(subTasks, ({ one }) => ({
  task: one(tasks, {
    fields: [subTasks.taskId],
    references: [tasks.id],
  }),
}));

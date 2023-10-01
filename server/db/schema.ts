import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const boards = pgTable("boards", {
  id: serial("id").primaryKey(),
  name: text("name"),
  userId: text("user_id"),
});

export const columns = pgTable("columns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  boardId: integer("board_id")
    .references(() => boards.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  columnId: integer("column_id")
    .references(() => columns.id, {
      onDelete: "cascade",
    })
    .notNull(),
});

export const subTasks = pgTable("sub_task", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  taskId: integer("task_id").references(() => tasks.id, {
    onDelete: "cascade",
  }),
  completed: integer("completed").notNull().default(0),
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

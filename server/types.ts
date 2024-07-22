import { inferProcedureOutput } from "@trpc/server";
import { boardsRouter } from "@/server/routers";
import { appRouter } from "@/server";

export type AppRouter = typeof appRouter;
export type Board = inferProcedureOutput<(typeof boardsRouter)["getById"]>;
export type Column = NonNullable<Board>["columns"][number];
export type Task = Column["tasks"][number];
export type SubTask = Task["subTasks"][number];

import { boardsRouter, tasksRouter } from "@/server/routers";
import { router } from "@/server/trpc";

export const appRouter = router({
  boards: boardsRouter,
  tasks: tasksRouter,
});

export type AppRouter = typeof appRouter;

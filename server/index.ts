import { router } from "@/server/app";
import { boardsRouter, tasksRouter } from "@/server/routers";

export const appRouter = router({
  boards: boardsRouter,
  tasks: tasksRouter,
});

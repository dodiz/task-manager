import { protectedProcedure, router } from "@/server/trpc";

export const tasksRouter = router({
  getAll: protectedProcedure.query(async () => {}),
  add: protectedProcedure.query(async () => {}),
  remove: protectedProcedure.query(async () => {}),
  update: protectedProcedure.query(async () => {}),
  move: protectedProcedure.query(async () => {}),
});

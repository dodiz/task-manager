import { z } from "zod";
import { eq } from "drizzle-orm";
import { protectedProcedure, router } from "@/server/app";
import { db } from "@/server/db";
import { subTasks, tasks } from "@/server/db/schema";

export const tasksRouter = router({
  add: protectedProcedure
    .input(
      z.object({
        columnId: z.number(),
        name: z.string(),
        description: z.string(),
        subTasks: z.array(z.string()),
      })
    )
    .mutation(
      async ({
        input: { name, description, subTasks: subTasksList, columnId },
      }) => {
        return db.transaction(async (tx) => {
          const { lastInsertRowid } = await tx
            .insert(tasks)
            .values({ name, description, columnId });
          await tx.insert(subTasks).values(
            subTasksList.map((name) => ({
              name,
              taskId: Number(lastInsertRowid),
            }))
          );
          return { id: lastInsertRowid };
        });
      }
    ),
  completeSubTask: protectedProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(({ input: { id, completed } }) => {
      return db
        .update(subTasks)
        .set({ completed: completed ? 1 : 0 })
        .where(eq(subTasks.id, id));
    }),
  remove: protectedProcedure.mutation(async () => {}),
  update: protectedProcedure.mutation(async () => {}),
  move: protectedProcedure.mutation(async () => {}),
});

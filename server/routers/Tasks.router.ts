import { z } from "zod";
import { protectedProcedure, router } from "@/server";
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
  remove: protectedProcedure.query(async () => {}),
  update: protectedProcedure.query(async () => {}),
  move: protectedProcedure.query(async () => {}),
});

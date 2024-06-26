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
        ctx,
        input: { name, description, subTasks: subTasksList, columnId },
      }) => {
        return ctx.db.transaction(async (tx) => {
          const rows = await tx
            .insert(tasks)
            .values({ name, description, columnId })
            .returning({
              id: tasks.id,
            });
          const taskId = rows[0].id;
          if (subTasksList.length > 0)
            await tx.insert(subTasks).values(
              subTasksList.map((name) => ({
                name,
                taskId,
              }))
            );
          return { id: taskId };
        });
      }
    ),
  completeSubTask: protectedProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .mutation(({ ctx, input: { id, completed } }) => {
      return ctx.db
        .update(subTasks)
        .set({ completed: completed ? 1 : 0 })
        .where(eq(subTasks.id, id));
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.delete(tasks).where(eq(tasks.id, id))
    ),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        newSubTasks: z.array(z.string()),
        prevSubTasks: z.array(
          z.object({
            action: z.enum(["delete", "update"]),
            id: z.number(),
            name: z.string(),
          })
        ),
      })
    )
    .mutation(
      async ({
        ctx,
        input: { id, name, description, newSubTasks, prevSubTasks },
      }) => {
        const subTasksToRemove = prevSubTasks.filter(
          (subTask) => subTask.action === "delete"
        );
        const subTasksToUpdate = prevSubTasks.filter(
          (subTask) => subTask.action === "update"
        );
        return ctx.db.transaction(async (tx) => {
          const removeRequests = subTasksToRemove.map((subTask) =>
            tx.delete(subTasks).where(eq(subTasks.id, subTask.id))
          );
          const updateRequests = subTasksToUpdate.map((subTask) =>
            tx
              .update(subTasks)
              .set({ name: subTask.name })
              .where(eq(subTasks.id, subTask.id))
          );
          if (newSubTasks.length > 0)
            await tx
              .insert(subTasks)
              .values(
                newSubTasks.map((subTask) => ({ name: subTask, taskId: id }))
              );
          await Promise.all([...updateRequests, ...removeRequests]);
          await tx
            .update(tasks)
            .set({ name, description: description || "" })
            .where(eq(tasks.id, id));
        });
      }
    ),
  move: protectedProcedure
    .input(
      z.object({
        taskId: z.number(),
        columnId: z.number(),
      })
    )
    .mutation(({ input: { taskId, columnId } }) => {
      return db.update(tasks).set({ columnId }).where(eq(tasks.id, taskId));
    }),
});

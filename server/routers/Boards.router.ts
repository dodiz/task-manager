import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { boards, columns } from "@/server/db/schema";
import { db } from "@/server/db";
import { protectedProcedure, router } from "@/server/app";

export const boardsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const results = await db.query.boards.findMany({
      where: (boards, { eq }) => eq(boards.userId, ctx.userId),
    });
    return results;
  }),
  add: protectedProcedure
    .input(z.object({ name: z.string(), columns: z.array(z.string()) }))
    .mutation(async ({ ctx, input: { name, columns: columnsData } }) => {
      const row = await db
        .insert(boards)
        .values({ name, userId: ctx.userId })
        .returning({ id: boards.id });
      const boardId = row[0].id;
      await db
        .insert(columns)
        .values(columnsData.map((name) => ({ name, boardId })));
      return { id: boardId };
    }),
  getById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const board = await db.query.boards.findFirst({
        where: (boards, { eq, and }) =>
          and(eq(boards.id, input.id), eq(boards.userId, ctx.userId)),
        with: {
          columns: {
            orderBy: (columns, { asc }) => asc(columns.id),
            with: {
              tasks: {
                orderBy: (tasks, { asc }) => asc(tasks.id),
                with: {
                  subTasks: {
                    orderBy: (subTasks, { asc }) => asc(subTasks.id),
                  },
                },
              },
            },
          },
        },
      });
      return board;
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input: { id } }) =>
      db
        .delete(boards)
        .where(and(eq(boards.id, id), eq(boards.userId, ctx.userId)))
    ),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        newColumns: z.array(z.string()),
        prevColumns: z.array(
          z.object({
            action: z.enum(["delete", "update"]),
            id: z.number(),
            name: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input: { id, name, newColumns, prevColumns } }) => {
      const columnsToRemove = prevColumns.filter(
        (column) => column.action === "delete"
      );
      const columnsToUpdate = prevColumns.filter(
        (column) => column.action === "update"
      );
      return db.transaction(async (tx) => {
        const removeRequests = columnsToRemove.map((column) =>
          tx.delete(columns).where(eq(columns.id, column.id))
        );
        const updateRequests = columnsToUpdate.map((column) =>
          tx
            .update(columns)
            .set({ name: column.name })
            .where(eq(columns.id, column.id))
        );
        if (newColumns.length > 0)
          await tx
            .insert(columns)
            .values(
              newColumns.map((column) => ({ name: column, boardId: id }))
            );
        await Promise.all([...updateRequests, ...removeRequests]);
        await tx.update(boards).set({ name }).where(eq(boards.id, id));
      });
    }),
});

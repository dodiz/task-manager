import { z } from "zod";

import { eq } from "drizzle-orm";
import { publicProcedure, router } from "./trpc";
import { boards, columns } from "./db/schema";
import { db } from "./db";

export const appRouter = router({
  getBoards: publicProcedure.query(async () => {
    const results = await db.query.boards.findMany();
    return results;
  }),
  addBoard: publicProcedure
    .input(z.object({ name: z.string(), columns: z.array(z.string()) }))
    .mutation(async ({ input: { name, columns: columnsData } }) => {
      const { lastInsertRowid } = db.insert(boards).values({ name }).run();
      columnsData.forEach((name) => {
        db.insert(columns)
          .values({ name, boardId: Number(lastInsertRowid) })
          .run();
      });
      return { id: lastInsertRowid };
    }),
  getBoard: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const board = await db.query.boards.findFirst({
        where: (boards, { eq }) => eq(boards.id, input.id),
        with: {
          columns: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      });
      return board;
    }),
  deleteBoard: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input: { id } }) =>
      db.delete(boards).where(eq(boards.id, id))
    ),
  updateBoard: publicProcedure
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
    .mutation(async ({ input: { id, name, newColumns, prevColumns } }) => {
      const columnsToRemove = prevColumns.filter(
        (column) => column.action === "delete"
      );
      const columnsToUpdate = prevColumns.filter(
        (column) => column.action === "update"
      );
      db.transaction(async (tx) => {
        const removeRequests = columnsToRemove.map((column) =>
          tx.delete(columns).where(eq(columns.id, column.id))
        );
        const updateRequests = columnsToUpdate.map((column) =>
          tx
            .update(columns)
            .set({ name: column.name })
            .where(eq(columns.id, column.id))
        );
        const insertRequests = newColumns.map((column) =>
          tx.insert(columns).values({ name: column, boardId: id })
        );
        await Promise.all([
          ...updateRequests,
          ...removeRequests,
          ...insertRequests,
        ]);
        await tx.update(boards).set({ name }).where(eq(boards.id, id));
      });
    }),
});

export type AppRouter = typeof appRouter;

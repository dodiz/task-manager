import { z } from "zod";
import { eq } from "drizzle-orm";
import { boards, columns } from "@/server/db/schema";
import { db } from "@/server/db";
import { publicProcedure, router } from "@/server/app";

export const boardsRouter = router({
  getAll: publicProcedure.query(async () => {
    const results = await db.query.boards.findMany();
    return results;
  }),
  add: publicProcedure
    .input(z.object({ name: z.string(), columns: z.array(z.string()) }))
    .mutation(async ({ input: { name, columns: columnsData } }) => {
      /**
       * @todo add transaction here
       */
      const row = await db
        .insert(boards)
        .values({ name })
        .returning({ id: boards.id });
      const boardId = row[0].id;
      for (let i = 0; i < columnsData.length; i++) {
        await db.insert(columns).values({ name: columnsData[i], boardId });
      }
      return { id: boardId };
    }),
  getById: publicProcedure
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
            with: {
              tasks: {
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
  remove: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ input: { id } }) =>
      db.delete(boards).where(eq(boards.id, id))
    ),
  update: publicProcedure
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
        tx.insert(columns).values(
          newColumns.map((column) => ({ name: column, boardId: id }))
        );
        await Promise.all([...updateRequests, ...removeRequests]);
        await tx.update(boards).set({ name }).where(eq(boards.id, id));
      });
    }),
});

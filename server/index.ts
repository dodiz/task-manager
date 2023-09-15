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
        columns: z.array(
          z.object({
            action: z.enum(["add", "remove", "update"]),
            id: z.number().optional(),
            name: z.string().optional(),
          })
        ),
      })
    )
    .mutation(({ input: { id, name } }) =>
      db.update(boards).set({ name }).where(eq(boards.id, id))
    ),
});

export type AppRouter = typeof appRouter;

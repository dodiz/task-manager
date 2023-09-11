import { publicProcedure, router } from "./trpc";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { z } from "zod";
import { Boards } from "@/server/db/Boards.schema";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: "./drizzle" });

export const appRouter = router({
  getBoards: publicProcedure.query(() => {
    const results = db.select().from(Boards).all();
    return results;
  }),
  addBoard: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      return db.insert(Boards).values({ name: input.name }).run();
    }),
  getBoardById: publicProcedure.input(String).query(async ({ input }) => {}),
});

export type AppRouter = typeof appRouter;

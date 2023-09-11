import { publicProcedure, router } from "./trpc";
import boards from "./data/boards.json";
import { readFile } from "fs/promises";

export const appRouter = router({
  getBoards: publicProcedure.query(async () => {
    return boards;
  }),
  getBoardById: publicProcedure.input(String).query(async ({ input }) => {
    const id = input;
    const data = await readFile(`./data/boards-${id}.json`);
    return JSON.parse(data.toString());
  }),
});

export type AppRouter = typeof appRouter;

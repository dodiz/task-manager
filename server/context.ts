import { env } from "@/env";
import { Pool } from "@neondatabase/serverless";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { drizzle } from "drizzle-orm/neon-serverless";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const userId = opts.req.headers
    .get("cookie")
    ?.split("uuid=")[1]
    ?.split(";")[0];
  const pool = new Pool({ connectionString: env.DATABASE_URI });
  const db = drizzle(pool);
  return {
    userId,
    db,
  };
};

export type Context = typeof createContext;

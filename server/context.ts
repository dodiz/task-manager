import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const userId = opts.req.headers
    .get("cookie")
    ?.split("uuid=")[1]
    ?.split(";")[0];
  return {
    userId,
  };
};

export type Context = typeof createContext;

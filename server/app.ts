import { Context } from "@/server/context";
import { TRPCClientError } from "@trpc/client";
import { initTRPC } from "@trpc/server";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  const { userId } = ctx;
  if (!userId) throw new TRPCClientError("Unauthorized");
  return next({
    ctx: {
      userId,
    },
  });
});

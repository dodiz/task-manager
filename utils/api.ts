import { createTRPCReact } from "@trpc/react-query";

import { type AppRouter } from "@/server/types";

export const api = createTRPCReact<AppRouter>();

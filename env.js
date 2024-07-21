import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        DATABASE_URI: z.string().url(),
        DATABASE_AUTH_TOKEN: z.string().min(1),
    },
    client: {
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URI: process.env.DATABASE_URI,
        DATABASE_AUTH_TOKEN: process.env.DATABASE_AUTH_TOKEN,
    },
    emptyStringAsUndefined: true,
});

import { z } from "zod";

const server = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]),
    DB_URL: z.string().url(),
});

const client = z.object(
  /** @satisfies {Record<`NEXT_PUBLIC_${string}`, import('zod').ZodType>} */(
        {
            //NEXT_PUBLIC_API_URL: z.string().url(),
        }
    ),
);

/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
};

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env);

const skip =
    !!process.env.SKIP_ENV_VALIDATION &&
    process.env.SKIP_ENV_VALIDATION !== "false" &&
    process.env.SKIP_ENV_VALIDATION !== "0";
if (!skip) {
    const isServer = typeof window === "undefined";

    const parsed = /** @type {MergedSafeParseReturn} */ (
        isServer
            ? merged.safeParse(processEnv) // on server we can validate all env vars
            : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
    );

    if (parsed.success === false) {
        console.error(
            "❌ Invalid environment variables:",
            parsed.error.flatten().fieldErrors,
        );
        throw new Error("Invalid environment variables");
    }

    env = new Proxy(parsed.data, {
        get(target, prop) {
            if (typeof prop !== "string") return undefined;
            // Throw a descriptive error if a server-side env var is accessed on the client
            // Otherwise it would just be returning `undefined` and be annoying to debug
            if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
                throw new Error(
                    process.env.NODE_ENV === "production"
                        ? "❌ Attempted to access a server-side environment variable on the client"
                        : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
                );
            return target[/** @type {keyof typeof target} */ (prop)];
        },
    });
}

export { env };

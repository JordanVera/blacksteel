import "server-only";

import { initTRPC } from "@trpc/server";
import { extractClientKey } from "@/lib/rate-limit";

export interface TRPCContext {
  headers: Headers;
  clientKey: string;
}

export async function createTRPCContext(opts: {
  headers: Headers;
}): Promise<TRPCContext> {
  return {
    headers: opts.headers,
    clientKey: extractClientKey(opts.headers),
  };
}

const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { appRouter } from "@/server/api/root";
import { createCallerFactory, createTRPCContext } from "@/server/api/trpc";
import { makeQueryClient } from "@/server/trpc/query-client";

export const getQueryClient = cache(makeQueryClient);

const createContext = cache(async () => {
  const reqHeaders = await headers();
  return createTRPCContext({ headers: reqHeaders });
});

export const trpcServer = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const createServerCaller = createCallerFactory(appRouter);

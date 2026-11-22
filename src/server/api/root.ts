import "server-only";

import { inquiryRouter } from "@/server/api/routers/inquiry";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  inquiry: inquiryRouter,
});

export type AppRouter = typeof appRouter;

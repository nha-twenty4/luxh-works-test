import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { createContactInquiry, getProjectBySlug, listProjects } from "./db";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  projects: router({
    list: publicProcedure.query(() => listProjects()),
    bySlug: publicProcedure.input(z.object({ slug: z.string().min(1) })).query(({ input }) => getProjectBySlug(input.slug)),
  }),
  contact: router({
    submit: publicProcedure.input(z.object({
      name: z.string().min(1).max(160),
      email: z.string().email().max(320),
      phone: z.string().max(80).optional(),
      service: z.string().min(1).max(120),
      details: z.string().min(1),
      budget: z.string().max(120).optional(),
      timeline: z.string().max(120).optional(),
    })).mutation(({ input }) => createContactInquiry(input)),
  }),
});

export type AppRouter = typeof appRouter;

import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/auth/new-user"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  // protects all /admin routes with clerk middlware
  matcher: ["/(admin)(.*)", "/api/auth/new-user", "/(api|trpc)(.*)"],
};

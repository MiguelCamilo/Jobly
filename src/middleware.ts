import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  // protects all /admin routes with clerk middlware
  matcher: ["/(admin)(.*)", '/api/((?!.+\\.[\\w]+$|_next).*)', '/((?!.+\\.[\\w]+$|_next).*)',],
};

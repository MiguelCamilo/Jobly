import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({});

export const config = {
    // protects all /admin routes with clerk middlware
    matcher: ["/(admin)(.*)"]
}

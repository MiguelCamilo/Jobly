// import { NextResponse } from "next/server";

// import prisma from "@/lib/prisma";
// import { currentUser, auth } from "@clerk/nextjs";

// export async function GET() {
//   try {
//     const { userId } = auth();
//     const clerkUser = await currentUser();

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!clerkUser) {
//       return new NextResponse("User does not exist", { status: 404 });
//     }

//     const existingUserDB = await prisma.user.findUnique({
//       where: {
//         clerkId: parseInt(clerkUser.id),
//       },
//     });

//     if (!existingUserDB) {
//       await prisma.user.create({
//         data: {
//           clerkId: parseInt(clerkUser.id),
//           email: clerkUser.emailAddresses[0].emailAddress,
//           firstName: clerkUser.firstName,
//           lastName: clerkUser.lastName,
//           profileImage: clerkUser.imageUrl,
//           userRole: "USER",
//         },
//       });
//     }

//     if (!existingUserDB) {
//       return new NextResponse(null, {
//         status: 302,
//         headers: {
//           Location: "http://localhost:3000/api/auth/new-user",
//         },
//       });
//     }

//     return new NextResponse(null, {
//       status: 302, // 302 Found - temporary redirect
//       headers: {
//         Location: "http://localhost:3000/",
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

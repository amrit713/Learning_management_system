import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/lib/getCurrentUser";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const { title } = await req.json();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const role = currentUser.role;

    if (role !== "TEACHER") {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const course = await db.course.create({
      data: {
        title: title as string,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { db } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { list } = await req.json();
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (user.role !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    console.log("[CREATE_THE_CHAPTER]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

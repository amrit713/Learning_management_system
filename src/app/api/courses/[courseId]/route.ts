import { db } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const values = await req.json();
    const user = await getCurrentUser();

    if (!courseId) {
      return new NextResponse("Not Found", { status: 400 });
    }

    if (!values) {
      return new NextResponse("Not Found", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (user.role !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        userId: user.id,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[PATCH]");
    return new NextResponse("Internal server error", { status: 500 });
  }
}

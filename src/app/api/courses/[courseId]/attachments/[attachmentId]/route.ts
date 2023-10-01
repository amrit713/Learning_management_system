import { db } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { courseId, attachmentId } = params;
    const user = await getCurrentUser();

    if (!courseId) {
      return new NextResponse("Not Found", { status: 400 });
    }
    if (!attachmentId) {
      return new NextResponse("Not Found", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (user.role !== "TEACHER") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: user.id,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where: {
        courseId,
        id: attachmentId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[DELETE_COURSE_ATTACHMENT_ERROR]", error);
  }
  return new NextResponse("internal server error", { status: 500 });
}

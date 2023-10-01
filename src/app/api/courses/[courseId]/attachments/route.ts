import { db } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = params;
    const { url } = await req.json();
    const user = await getCurrentUser();
    if (!courseId) {
      return new NextResponse("Not Found", { status: 400 });
    }

    if (!url) {
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
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId,
      },
    });

    return NextResponse.json(attachment);
  } catch (error) {
    console.log("[COURSE_ID_ATTACHMENTS]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}

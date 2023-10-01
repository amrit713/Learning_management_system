import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { db } from "@/lib/db";
import getCurrentUser from "@/lib/getCurrentUser";
import { IconBadge } from "@/components/icon-badge";
import { TitleFormCourse } from "@/components/course/title-form-course";
import { DescriptionFormCourse } from "@/components/course/description-form-course";
import { ImageFormCourse } from "@/components/course/image-form-course";
import { CategoryFormCourse } from "@/components/course/category-form-course";
import { PriceFormCourse } from "@/components/course/price-form-course";
import { AttachmentFormCourse } from "@/components/course/attachment-form-course";

const CourseIdpage = async ({
  params,
}: {
  params: {
    courseId: string;
  };
}) => {
  const user = await getCurrentUser();
  if (!user) {
    return redirect("/");
  }
  if (!user.id) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId: user.id,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-zinc-700">
            Completed all fields( {completionText})
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleFormCourse initialData={course} courseId={course.id} />

          <DescriptionFormCourse initialData={course} courseId={course.id} />

          <ImageFormCourse initialData={course} courseId={course.id} />

          <CategoryFormCourse
            initialData={course}
            courseId={course.id}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Course chapters</h2>
            </div>
            <div className="">TODO: Chapters</div>
          </div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={CircleDollarSign} />
            <h2 className="text-xl">Sell your course</h2>
          </div>

          <PriceFormCourse initialData={course} courseId={course.id} />

          <div className="flex items-center gap-x-2">
            <IconBadge icon={File} />
            <h2 className="text-xl">Resources & Attachments</h2>
          </div>

          <AttachmentFormCourse initialData={course} courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

export default CourseIdpage;

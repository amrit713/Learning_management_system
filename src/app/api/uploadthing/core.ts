import getCurrentUser from "@/lib/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes

const auth = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("unauthorized");
  }

  if (!user.id) {
    throw new Error("unauthorized");
  }

  return { userId: user.id };
};

export const ourFileRouter = {
  profileImage: f(["image"]).onUploadComplete((data) => {
    console.log("profile url", data);
  }),

  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => auth())
    .onUploadComplete((data) => {
      console.log("course url", data);
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => auth())
    .onUploadComplete((data) => {
      console.log("course attachment url", data);
    }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512MB" } })
    .middleware(() => auth())
    .onUploadComplete((data) => {
      console.log("chapter video  url", data);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

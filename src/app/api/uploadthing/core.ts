import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  profileImage: f(["image"]).onUploadComplete((data) => {
    console.log("profile url", data);
  }),

  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete((data) => {
    console.log("flie url", data);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

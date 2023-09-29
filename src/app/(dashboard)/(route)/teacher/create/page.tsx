"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is reqired",
  }),
});
const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/course", values);
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" flex max-w-5xl mx-auto md:items-start md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl font-medium">Name your course</h1>
        <p className="text-sm text-zinc-500">
          What would you like to name your course? Don&apos;t worry, you can
          change it this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Javascript bootcamp'"
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    What will you tech in this course ?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" disabled={!isValid || isSubmitting}>
                Continue
                {isSubmitting && (
                  <Loader className="animate-spin w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;

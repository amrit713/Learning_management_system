"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  Form,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useModal } from "@/hooks/use-modal-store";

import { FileUpload } from "@/components/file-upload";
import { User } from "@prisma/client";

const fromSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email must be valid ",
    }),
  name: z.string().min(1, { message: "full Name is required" }),
  image: z.string().optional(),

  password: z
    .string()
    .regex(new RegExp(".*[a-z].*"), "One lowercase character")
    .regex(new RegExp(".*\\d.*"), "One number")
    .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "One special character"
    )
    .min(8, {
      message: "Password must be 8 character long",
    }),
});

export const RegisterModal = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen, type } = useModal();

  const form = useForm({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      image: "",
    },
  });

  const modalOpen = isOpen && type === "register";

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    try {
      await axios.post("/api/register", values);

      form.reset();
      router.refresh();
      onClose();
      onOpen("login");
      toast.success(" User Registered Successfully");
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.response.data);
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-black px-6 pt-8 text-xl">
            Register
          </DialogTitle>

          <DialogDescription className="text-center text-gray-500 text-sm font-medium ">
            Hey, Enter your details to Register to new account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" px-6 w-full relative">
              <div className="flex flex-col items-center justify-center gap-y-4  ">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase font-semibold text-zinc-600 text-xs">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-zinc-00 border-2 focus-visible:border-zinc-700 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder=" Enter your name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase font-semibold text-zinc-600 text-xs">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-zinc-00 border-2 focus-visible:border-zinc-700 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder=" Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="uppercase font-semibold text-zinc-600 text-xs">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="border-zinc-300 border-2 focus-visible:border-zinc-700 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                          placeholder=" Enter your password"
                          {...field}
                          type="password"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-center items-center text-center ">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endpoint="profileImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage className="text-red-700" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 pt-6 flex flex-col gap-y-2">
              <Button className="w-full">
                Register
                {isLoading && <Loader className="animate-spin w-4 h-4 ml-2" />}
              </Button>
              {/* <p className="text-zinc-600 text-center"> or </p> */}
            </div>
          </form>
        </Form>

        <div className="px-6 pb-6  ">
          {/* <Button variant="outline" className="w-full">
            Register With Google
          </Button> */}

          <div className="flex text-sm gap-x-2 items-center text-zinc-600">
            <p>Already have acount?</p>
            <Button
              variant="link"
              className="text-rose-600"
              onClick={() => onOpen("login")}
            >
              login
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
function signIn(
  arg0: string,
  arg1: {
    redirect: boolean;
    email: string;
    name: string;
    password: string;
    image?: string | undefined;
  }
) {
  throw new Error("Function not implemented.");
}

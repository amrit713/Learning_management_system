/* eslint-disable react/no-unescaped-entities */
"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

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

import { useModal, ModalType } from "@/hooks/use-modal-store";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

const fromSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email must be valid ",
    }),

  password: z.string().min(8, {
    message: "Password must be 8 character long",
  }),
});

export const LoginModal = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose, type } = useModal();

  const form = useForm({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const modalOpen = isOpen && type === "login";

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof fromSchema>) => {
    const response = await signIn("credentials", {
      ...values,
      redirect: false,
    });
    //  TODO: Need to data some error handling in next auth
    if (response?.error) {
      console.log(response.error);
      toast.error(response.error);
    } else {
      form.reset();
      router.refresh();
      onClose();
      toast.success("Login Successfully");
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-black px-6 pt-8 text-xl">
            Login
          </DialogTitle>

          <DialogDescription className="text-center text-gray-500 text-sm font-medium ">
            Hey, Enter your details to get Sign in to your account
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" px-6 w-full">
              <div className="flex flex-col items-center justify-center gap-y-4  ">
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
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="px-6 pt-6 flex flex-col gap-y-2">
              <Button className="w-full">
                Login
                {isLoading && <Loader className="animate-spin w-4 h-4 ml-2" />}
              </Button>
              <p className="text-zinc-600 text-center"> or </p>
            </div>
          </form>
        </Form>

        <div className="px-6 pb-6  ">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Login With Google
          </Button>

          <div className="flex text-sm gap-x-2 items-center text-zinc-600">
            <p>Don't have account ?</p>
            <Button
              variant="link"
              className="text-rose-600"
              onClick={() => onOpen("register")}
            >
              create account
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

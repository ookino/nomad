"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSession } from "@/server/actions/create-session-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretRight } from "@phosphor-icons/react";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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

import { Separator } from "../ui/separator";
import { SocialAuthenticationProvider } from "./social-auth-providers";

const AccessSchema = z.object({
  email: z.string().email(),
});

export function LoginForm() {
  const params = useSearchParams();
  const urlError =
    params.get("error") === "OAuthAccountNotLinked"
      ? { type: "error", message: "Email is already linked to another account" }
      : {};
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof AccessSchema>>({
    resolver: zodResolver(AccessSchema),
    defaultValues: {
      email: "",
    },
  });

  async function processAccess(values: z.infer<typeof AccessSchema>) {
    startTransition(async () => {
      const { success } = await createSession(values.email);

      if (success) {
        form.reset();
        toast.success(success);
      }
      if (!success) {
        form.reset();
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          className="space-y-2 md:space-y-4"
          onSubmit={form.handleSubmit(processAccess)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    className="email"
                    type="email"
                    disabled={true}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  Enter your email to login or create a new account
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full items-center gap-4">
            <Button
              type="submit"
              className="items-center gap-4"
              disabled={true}
            >
              {isPending ? (
                <div className="flex items-center px-4">
                  <BeatLoader size={8} color="#f5f5f5" />
                </div>
              ) : (
                <>
                  Continue
                  <CaretRight weight="bold" />
                </>
              )}
            </Button>

            <div className="w-full">
              <Separator className="" />
            </div>

            <div>
              <span className="text-nowrap text-xs font-medium text-muted-foreground">
                or continue with
              </span>
            </div>
          </div>

          <SocialAuthenticationProvider />
        </form>
      </Form>
    </div>
  );
}

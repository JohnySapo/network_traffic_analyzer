"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/UseAuth";
import { useState } from "react";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required!"
  }).max(9, {
    message: "Username must be max of 09 characters.",
  }),
  email: z.string().min(1, {
    message: "Email is required!"
  }).email({
    message: "Email must be in its format: email@domain.com",
  }),
  firstname: z.string().max(12, {
    message: "First name must be max of 12 characters.",
  }),
  lastname: z.string().max(12, {
    message: "Last name must be max of 12 characters.",
  }),
})

export function AccountForm({ onCancel }: { onCancel?: () => void }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  })

  const { updateProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      toast("✅ Your account has been updated!");
      onCancel?.();
    } catch (error: any) {
      toast(`❌ ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  const items: {
    name: keyof z.infer<typeof FormSchema>;
    Label: string;
    placeholder: string;
    type: string;
  }[] = [
      { name: "username", Label: "Username", placeholder: "Username", type: "text" },
      { name: "email", Label: "Email", placeholder: "Email", type: "email" },
      { name: "firstname", Label: "First name", placeholder: "First name", type: "text" },
      { name: "lastname", Label: "Last name", placeholder: "Last name", type: "text" },
    ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6">

        {items.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            name={item.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.Label}</FormLabel>
                <FormControl>
                  <Input placeholder={item.placeholder} type={item.type} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className="grid grid-cols-2 gap-2">
          <Button type="submit" className="cursor-pointer">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          {onCancel && (
            <Button type="button" onClick={onCancel} className="cursor-pointer">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}

export default AccountForm;
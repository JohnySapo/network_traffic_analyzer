import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/UseAuth";
import { PASSWORD_REGEX } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";


const FormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required!"
  }).max(12).regex(PASSWORD_REGEX, {
    message: "Current Password must be max of 12 characters. Example: 'Password@5678'",
  }),
  newPassword: z.string().min(1, {
    message: "Password is required!"
  }).max(12, {
    message: "Current Password must be max of 12 characters.",
  }).regex(PASSWORD_REGEX, {
    message: "Your password must follow the format: 'Password@5678'",
  }),
  confirmNewPassword: z.string().min(1, {
    message: "Password is required!"
  }).max(12, {
    message: "Current Password must be max of 12 characters.",
  }).regex(PASSWORD_REGEX, {
    message: "Your password must follow the format: 'Password@5678'",
  }),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New Password & Confirm Password must be the same.",
  path: ["confirmNewPassword"],
})

export function ResetPassword() {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  const { updatePassword } = useAuth();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await updatePassword(data);
      toast("✅ Your password has been updated!");
    } catch (error: any) {
      toast(`❌ ${error.message}`);
    }
  }

  const items: {
    name: keyof z.infer<typeof FormSchema>;
    Label: string;
    placeholder: string;
    type: string;
  }[] = [
      { name: "currentPassword", Label: "Current Password", placeholder: "Current Password", type: "password" },
      { name: "newPassword", Label: "New Password", placeholder: "New Password", type: "password" },
      { name: "confirmNewPassword", Label: "Confirm Password", placeholder: "Confirm Password", type: "password" },
    ]

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6 mt-7">

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
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ResetPassword
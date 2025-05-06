import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/user-authentication";
import { PASSWORD_REGEX } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
    password: z.string().min(1, {
        message: "Password is required!"
    }).min(12, {
        message: "Password must be minimum of 12 characters.",
    }).regex(PASSWORD_REGEX, {
        message: "Your password must follow the format: 'Password@5678'",
    }),
    confirmPassword: z.string().min(1, {
        message: "Confirm Password is required!"
    }).min(12, {
        message: "Confirm Password must be minimum of 12 characters.",
    }).regex(PASSWORD_REGEX, {
        message: "Your confirm password must follow the format: 'Password@5678'",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password & Confirm Password must be the same.",
    path: ["confirmPassword"],
})

export function RegisterForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        }
    })

    const { registerUser } = useAuth();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await registerUser(data);
            toast("✅ You have been successfully registered!!");
        } catch (error: any) {
            setErrorMessage(`❌ ${error.message}`);
        }
    }

    const items: {
        name: keyof z.infer<typeof FormSchema>;
        Label: string;
        placeholder: string;
        type: string;
    }[] = [
            { name: "username", Label: "Username", placeholder: "Username", type: "text", },
            { name: "email", Label: "Email", placeholder: "Email", type: "text", },
            { name: "password", Label: "Password", placeholder: "Password", type: "password", },
            { name: "confirmPassword", Label: "Confirm Password", placeholder: "Confirm Password", type: "password", }
        ]


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <FormField
                            key={item.name}
                            control={form.control}
                            name={item.name}
                            render={({ field }) => (
                                <div className="grid gap-2">
                                    <FormItem>
                                        <FormLabel>{item.Label}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={item.placeholder} type={item.type} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                    ))}
                    {errorMessage && (
                        <div className="text-red-900 text-sm m-0 p-0 text-center">
                            {errorMessage}
                        </div>
                    )}
                    <Button type="submit" className="w-full cursor-pointer">
                        Sign Up
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default RegisterForm;
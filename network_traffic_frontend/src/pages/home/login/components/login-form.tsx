
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
    password: z.string().min(1, {
        message: "Password is required!"
    }).max(12, {
        message: "Current Password must be max of 12 characters.",
    }).regex(PASSWORD_REGEX, {
        message: "Your password must follow the format: 'Password@5678'",
    }),
})

export function LoginForm() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const { loginUser } = useAuth();
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await loginUser(data)
            toast("✅ You have been successfully logged-in!!");
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
        { name: "username", Label: "Username", placeholder: "Username", type: "text" },
        { name: "password", Label: "Password", placeholder: "Password", type: "password" },
    ]

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    {items.map((item) => (
                        item.name === "password" ? (
                            <FormField
                                key={item.name}
                                control={form.control}
                                name={item.name}
                                render={({ field }) => (
                                    <div className="grid gap-2">
                                        <FormItem>
                                            <div className="flex item-center">
                                                <FormLabel>{item.Label}</FormLabel>
                                                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                                    Forgot your password?
                                                </a>
                                            </div>
                                            <FormControl>
                                                <Input placeholder={item.placeholder} type={item.type} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </div>
                                )}
                            />
                        ) : (
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
                        )
                    ))}
                    {errorMessage && (
                        <p className="text-red-900 text-sm m-0 p-0 text-center">
                            {errorMessage}
                        </p>
                    )}
                    <Button type="submit" className="w-full cursor-pointer">
                        Login
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LoginForm;
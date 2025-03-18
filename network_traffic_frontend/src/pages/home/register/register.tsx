import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useAuth } from "@/context/UseAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};

type RegisterFormInput = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().required("Confirmation of password is required"),
});

export const Register = (props: Props) => {

    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInput>({ resolver: yupResolver(validation) });

    const handleRegister = (form: RegisterFormInput) => {
        registerUser(
            form.username,
            form.email,
            form.password,
            form.confirmPassword
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2x1">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    Enter your information below to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Username"
                                {...register("username")}
                            />
                            {errors.username ? (
                                <h1 className="text-sm text-red-900 font-medium">
                                    {errors.username?.message}
                                </h1>
                            ) : ("")}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Email"
                                {...register("email")}
                            />
                            {errors.email ? (
                                <h1 className="text-sm text-red-900 font-medium">
                                    {errors.email?.message}
                                </h1>
                            ) : ("")}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="Password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                {...register("password")}
                            />
                            {errors.password ? (
                                <h1 className="text-sm text-red-900 font-medium">
                                    {errors.password?.message}
                                </h1>
                            ) : ("")}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="Confirm Password">Confirm Password</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword ? (
                                <h1 className="text-sm text-red-900 font-medium">
                                    {errors.confirmPassword?.message}
                                </h1>
                            ) : ("")}
                        </div>
                        <Button type="submit" className="w-full cursor-pointer">
                            Sign Up
                        </Button>
                    </div>
                    {/* {errors.username || errors.password ? (
                <h1 className="mt-4 text-center text-sm text-red-500">
                    {errors.username?.message}
                </h1>
            ) : ("")} */}
                </form>
            </CardContent>
        </Card>
    )
}

export default Register;
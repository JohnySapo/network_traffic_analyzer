
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./components/login-form";

export const Login = () => {

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2x1">
                    Login
                </CardTitle>
                <CardDescription>
                    Enter your credential below to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="flex flex-col gap-6">
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
                            <div className="flex item-center">
                                <Label htmlFor="password">Password</Label>
                                <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                    Forgot your password?
                                </a>
                            </div>
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
                        <Button type="submit" className="w-full cursor-pointer">
                            Login
                        </Button>
                    </div>
                </form> */}
                <LoginForm />
            </CardContent>
        </Card>
    );
}

export default Login;
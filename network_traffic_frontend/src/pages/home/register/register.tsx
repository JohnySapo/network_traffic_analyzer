import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import RegisterForm from "./components/register-form";




export const Register = () => {


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
                <RegisterForm />
                {/* <form onSubmit={handleSubmit(handleRegister)}>
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
                </form> */}
            </CardContent>
        </Card>
    )
}

export default Register;
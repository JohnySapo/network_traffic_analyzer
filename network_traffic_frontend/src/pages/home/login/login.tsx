
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
                <LoginForm />
            </CardContent>
        </Card>
    );
}

export default Login;
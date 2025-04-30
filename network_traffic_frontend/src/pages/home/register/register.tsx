import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import RegisterForm from "@/pages/home/register/components/register-form";

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
            </CardContent>
        </Card>
    )
}

export default Register;
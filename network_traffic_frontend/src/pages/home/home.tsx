import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login/login";
import Register from "./register/register";


export const HomePage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
            <Tabs defaultValue="login" className="w-[400px] ">

                <TabsList className="grid w-full grid-cols-2 ">
                    <TabsTrigger value="login" className="cursor-pointer ">Login</TabsTrigger>
                    <TabsTrigger value="signup" className="cursor-pointer ">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Login />
                </TabsContent>

                <TabsContent value="signup">
                    <Register />
                </TabsContent>

            </Tabs>
        </div>
    )
}

export default HomePage;
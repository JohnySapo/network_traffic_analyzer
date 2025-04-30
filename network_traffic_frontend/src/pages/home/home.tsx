import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./login/login";
import Register from "./register/register";
import { Command } from "lucide-react";


export const HomePage = () => {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
            <Tabs defaultValue="login" className="w-[400px] ">
                <div className="text-center font-extralight text-4xl font-sans tracking-widest p-1">
                    <div className="flex justify-center items-center">
                        <Command className="size-14" />
                    </div>
                    <p className="">TU Dublin</p>
                    <h1 className="">Network Analyzer</h1>
                </div>
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
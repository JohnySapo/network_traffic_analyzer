import { useAuth } from "@/context/user-authentication";
import { useState } from "react";
import { AccountForm } from "./account-form";
import { Button } from "@/components/ui/button";

export const ProfileInfo = () => {

    const { user } = useAuth();
    const [isEdit, setIsEdit] = useState(false);
    return (
        <div className="mt-7">
            {!isEdit ? (
                <div className="flex justify-between w-full">
                    <div className="mt-5 w-screen">
                        <div className="p-5 border-b-2 flex justify-between">
                            <div className="">
                                <h1 className="text-md">Username</h1>
                                <h1 className="mt-2 font-light text-neutral-400">{user?.username}</h1>
                            </div>
                            <Button onClick={() => setIsEdit(true)} className="cursor-pointer">
                                Edit Account
                            </Button>
                        </div>
                        <div className="p-5 border-b-2">
                            <h1 className="text-md">Email</h1>
                            <h1 className="mt-2 font-light text-neutral-400">{user?.email}</h1>
                        </div>
                        <div className="p-5 border-b-2">
                            <h1 className="text-md">Name</h1>
                            <h1 className="mt-2 font-light text-neutral-400">
                                {user?.firstname !== null && user?.lastname !== null ? (
                                    `${user?.firstname} ${user?.lastname}`
                                ): (
                                    " "
                                )}
                            </h1>
                        </div>
                    </div>
                </div>
            ) : (
                <AccountForm onCancel={() => setIsEdit(false)} />
            )}
        </div>
    )
}

export default ProfileInfo;
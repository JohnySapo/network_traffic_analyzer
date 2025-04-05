import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ResetPasswordForm from './reset-password-form';

export const ResetPassword = () => {

    const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="mt-7 me-40">
    {!isEdit ? (
        <div className="flex justify-between w-full">
            <div className="mt-5 w-screen">
                <div className="p-5 border-b-2 flex justify-between">
                    <div className="">
                        <h1 className="text-md">Password</h1>
                        <h1 className="mt-2 font-light text-neutral-400">************</h1>
                    </div>
                    <Button onClick={() => setIsEdit(true)} className="cursor-pointer">
                        Edit Account
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <ResetPasswordForm onCancel={() => setIsEdit(false)} />
    )}
</div>
  )
}

export default ResetPassword;
import ResetPassword from "../components/reset-password-info";


export const ResetPasswordPage = () => {
  return (
    <div className="rounded-2xl dark:bg-muted/50 bg-zinc-50 me-40 p-5">
      <h1 className="text-3xl text-light pb-2 border-b-2">
        Reset Password Information
      </h1>
      <ResetPassword />
    </div>
  );
}

export default ResetPasswordPage;
import ProfileInfo from "../components/account-info";

export const Account = () => {
    return (
        <div className="rounded-2xl dark:bg-muted/50 bg-zinc-50 shadow dark:shadow-gray-50/15 me-40 p-5">
            <h1 className="text-3xl text-light pb-2 border-b-2">
                Account Information
            </h1>
            <ProfileInfo />
        </div>
    )
}

export default Account;
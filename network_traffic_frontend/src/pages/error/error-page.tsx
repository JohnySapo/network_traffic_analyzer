import { Command } from "lucide-react";

export const ErrorPage = () => {
  return (
    <div className="flex w-full items-center justify-center p-6 md:p-10 mt-70">
      <div className="text-center font-extralight text-4xl font-sans tracking-widest p-1">
        <div className="flex justify-center items-center">
          <Command className="size-14" />
        </div>
        <p className="">TU Dublin</p>
        <h1 className="">Network Analyzer</h1>
        <p className="text-lg">Something went wrong. Please refresh the page!</p>
      </div>
    </div>
  )
}

export default ErrorPage;


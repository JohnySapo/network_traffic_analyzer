import { ReporterTable } from "./components/table/data-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchHeader } from "@/pages/search/components/header/header-card";
import { CheckIPAddress } from "@/hooks/checkip-hook";
import { Command } from "lucide-react";
import LoadingPage from "@/pages/loading/loading-page";
import ErrorPage from "@/pages/error/error-page";

export const SearchIPs = () => {

  const [ ipAddress, setIpAddress ] = useState<string>("");
  const [ queryIp, setQueryIp ] = useState<string>("");
  const [ isSearching, setIsSearching ] = useState<boolean>(false);
  const [ pageSize ] = useState<number>(8);
  const [ currentPage, setCurrentPage ] = useState<number>(0);

  const { data: ipData, loading, error } = CheckIPAddress(queryIp, currentPage, pageSize);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(0);
    setQueryIp(ipAddress);
    setIsSearching(true);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  }

  if (loading && isSearching ) return <LoadingPage />;
  if (error && isSearching ) return <ErrorPage />;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 lg:px-6">
          <div className="flex justify-evenly items-center border rounded-2xl p-5 shadow dark:shadow-amber-50/20 shadow-neutral-950/20 bg-card">
            <h1 className="text-3xl font-sans tracking-widest font-extralight">IP Address Checker</h1>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter IP Address"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className=""
              />
              <Button type="submit" className="cursor-pointer">
                Check IP Address
              </Button>
            </form>
          </div>

          {isSearching && ipData && (
            <>
              <SearchHeader ipAddressData={ipData} />
              <ReporterTable reportersData={ipData.reports} loading={loading} inPageChange={handlePageChange} />
            </>
          )}

          {!isSearching && !ipData && (
            <div className="flex w-full items-center justify-center mt-70 font-sans tracking-widest font-extralight border rounded-2xl p-5 shadow dark:shadow-amber-50/20 shadow-neutral-950/20 bg-card">
              <div className="">
                <div className="flex justify-center items-center">
                  <Command className="size-25" />
                </div>
              </div>
              <div className="ms-1 text-3xl">
                <p className="">Search One IP Address at a time</p>
                <h1 className="">Making your life protected</h1>
              </div>
            </div>
          )}

        </div>
      </div>
    </div >
  )
}

export default SearchIPs;
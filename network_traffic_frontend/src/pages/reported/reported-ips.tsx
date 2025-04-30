import { useState } from "react";
import { HeaderCards } from "@/pages/reported/components/header/header-cards";
import { DataTable } from "@/pages/reported/components/table/data-table";
import { BlacklistData } from "@/hooks/blacklist-hook";
import { BlacklistFilter } from "@/pages/reported/components/table/data-filter";
import { ErrorPage } from "@/pages/error/error-page";
import { LoadingPage } from "@/pages/loading/loading-page";

export const ReportedIPs = () => {
  const [pages, setPages] = useState(1);
  const defaultPages = 10;

  const [filters, setFilters] = useState<{
    countryCode?: string;
    abuseScore?: number;
    lastReportedDate?: string;
  }>({});

  const { data, items, loading, error } = BlacklistData(
    pages,
    defaultPages,
    "lastReportedAt,desc",
    filters,
  );

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <HeaderCards />
          <BlacklistFilter onFilter={setFilters} />
          <DataTable
            data={data}
            currentPage={pages}
            totalItems={items}
            itemsPerPage={defaultPages}
            inPageChange={setPages}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportedIPs;

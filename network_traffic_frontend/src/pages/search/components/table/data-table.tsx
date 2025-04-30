import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReportersPagination } from "@/model/check";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDateSetup, getCategoryNameByValue, truncateReportersComments } from "@/lib/check/check-utils";
import { format, formatDistanceToNow } from "date-fns";
import { getPageNumber, validateAndDisplayTotalPages } from "@/lib/pagination-utils";

type ReportersPaginationProps = {
  reportersData: ReportersPagination
  loading: boolean
  inPageChange: (page: number) => void
}

export const ReporterTable = ({ reportersData, loading, inPageChange }: ReportersPaginationProps) => {

  const currentPage = reportersData.page + 1;

  return (
    <div className="">
      <div className="rounded-2xl border shadow">
        <Table className="dark:bg-transparent bg-card rounded-2xl">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Reporter</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead className="w-[40%]">Comment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportersData.reports.map((report, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>
                      {format(new Date(report.reportedAt), getDateSetup())}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(report.reportedAt), { addSuffix: true })}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="flex items-center">
                  {report.reporterCountryName}
                  <img src={`https://flagcdn.com/w40/${report.reporterCountryCode.toLowerCase()}.png`} width="25" height="20" alt={report.reporterCountryName} className="ms-1" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {report.categories.map((category, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {getCategoryNameByValue(category)}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs">
                  <div className="whitespace-normal break-words text-sm">{truncateReportersComments(report.comment)}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-sm text-gray-500">
          Showing {reportersData.reports.length} of {reportersData.totalElements} row(s) selected
        </div>
        <div className="flex items-center space-x-2">

          <Button
            variant="outline"
            size="sm"
            onClick={() => inPageChange(currentPage)}
            disabled={currentPage === 1}
            className="cursor-pointer"
          >
            Previous
          </Button>

          <div className="flex items-center gap-1">

            {getPageNumber(currentPage, reportersData.totalElements, reportersData.size).map((pageNumb) => (
              <Button
                key={pageNumb}
                variant={pageNumb === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => inPageChange(pageNumb)}
                disabled={loading}
                className="w-8 h-8 p-0 cursor-pointer"
              >
                {pageNumb}
              </Button>
            ))}

            {validateAndDisplayTotalPages(reportersData.page, reportersData.totalElements, reportersData.size) && (
              <>
                <div className="w-8 h-8 flex items-center justify-center">...</div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => inPageChange(reportersData.totalPages)}
                  disabled={loading}
                  className="w-8 h-8 p-0 cursor-pointer"
                >
                  {reportersData.totalPages}
                </Button>
              </>
            )}

          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => inPageChange(currentPage + 1)}
            disabled={currentPage >= reportersData.totalPages}
            className="cursor-pointer"
          >
            Next
          </Button>

        </div>
      </div>
    </div>
  )
}

export default ReporterTable;
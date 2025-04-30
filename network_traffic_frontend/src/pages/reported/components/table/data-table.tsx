import { Copy } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { PageableData } from "@/model/blacklist";
import {
    blacklistTableCopyDataOfTheRow,
    getDateSetup,
} from "@/lib/blacklist/blacklist-utils";
import { getPageNumber, getTotalPages, validateAndDisplayTotalPages } from "@/lib/pagination-utils";

export function DataTable({
    data,
    currentPage,
    totalItems,
    itemsPerPage,
    inPageChange,
}: PageableData) {

    const firstIndex = (currentPage - 1) * itemsPerPage + 1;
    const lastIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="space-y-4 px-4 lg:px-6 ">
            <div className="rounded-2xl border shadow">
                <Table className="dark:bg-transparent bg-card rounded-2xl">
                    <TableHeader>
                        <TableRow className="dark:bg-muted ">
                            <TableHead className="ps-5">IP Address</TableHead>
                            <TableHead>Country Code</TableHead>
                            <TableHead>Abuse Meter</TableHead>
                            <TableHead>Last Reported</TableHead>
                            <TableHead className="text-right pe-5">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="ps-5">{item.ipAddress}</TableCell>
                                <TableCell>{item.countryCode}</TableCell>
                                <TableCell className="pe-40">
                                    <div className="flex items-center gap-2">
                                        <Progress value={item.abuseConfidenceScore} className="w-full h-2" />
                                        <span className="text-xs w-8 text-right">{item.abuseConfidenceScore}%</span>
                                    </div>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex flex-col">
                                        <span>
                                            {item.lastReportedAt != null
                                                ? format(new Date(item.lastReportedAt), getDateSetup())
                                                : format(item.lastReportedAt, getDateSetup())}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {item.lastReportedAt != null
                                                ? formatDistanceToNow(new Date(item.lastReportedAt), { addSuffix: true })
                                                : formatDistanceToNow(item.lastReportedAt, { addSuffix: true })}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pe-7">
                                    <Button variant="ghost" size="icon" onClick={() => blacklistTableCopyDataOfTheRow(item)} title="Copy row data" className="cursor-pointer">
                                        <Copy className="h-4 w-4" />
                                        <span className="sr-only">Copy row data</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{firstIndex}</span> to{" "}
                    <span className="font-medium">{lastIndex}</span> of <span className="font-medium">{totalItems}</span>{" "}
                    row(s) selected.
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => inPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="cursor-pointer"
                    >
                        Previous
                    </Button>
                    <div className="flex items-center space-x-1">
                        {getPageNumber(currentPage, totalItems, itemsPerPage).map((pageNumber) => (
                            <Button
                                key={pageNumber}
                                variant={currentPage === pageNumber ? "default" : "outline"}
                                size="sm"
                                onClick={() => inPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </Button>
                        ))}
                        {validateAndDisplayTotalPages(currentPage, totalItems, itemsPerPage) && (
                            <>
                                <span className="mx-1">...</span>
                                <Button variant="outline" size="sm" onClick={() => inPageChange(getTotalPages(totalItems, itemsPerPage))}>
                                    {getTotalPages(totalItems, itemsPerPage)}
                                </Button>
                            </>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => inPageChange(currentPage + 1)}
                        disabled={currentPage === getTotalPages(totalItems, itemsPerPage)}
                        className="cursor-pointer"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default DataTable;
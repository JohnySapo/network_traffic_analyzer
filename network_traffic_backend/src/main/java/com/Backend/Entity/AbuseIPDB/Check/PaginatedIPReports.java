package com.Backend.Entity.AbuseIPDB.Check;

import java.util.List;

/*
 ** PaginatedIPReports entity class allow
 ** the CheckIP class to receive the comments
 ** from the reporters pageable for the front-end
*/
public class PaginatedIPReports {
    private int page;
    private int size;
    private long totalElements;
    private int totalPages;
    private List<CheckIPReporter> reports;

    public PaginatedIPReports(
            int page,
            int size,
            long totalElements,
            int totalPages,
            List<CheckIPReporter> reports
    ) {
        this.page = page;
        this.size = size;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.reports = reports;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public List<CheckIPReporter> getReports() {
        return reports;
    }

    public void setReports(List<CheckIPReporter> reports) {
        this.reports = reports;
    }
}

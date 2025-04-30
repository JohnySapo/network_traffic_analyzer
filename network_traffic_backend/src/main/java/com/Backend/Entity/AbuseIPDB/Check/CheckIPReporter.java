package com.Backend.Entity.AbuseIPDB.Check;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.ZonedDateTime;
import java.util.List;

/*
 ** The CheckIPReporter Entity class
 ** manages the structure and mapping of
 ** the reporter's comments data
 ** as JSON from AbuseIPDB API and service utility.
*/
public class CheckIPReporter {

    @JsonProperty("reportedAt")
    private ZonedDateTime reportedAt;

    @JsonProperty("comment")
    private String comment;

    @JsonProperty("categories")
    private List<Integer> categories;

    @JsonProperty("reporterId")
    private Long reporterId;

    @JsonProperty("reporterCountryCode")
    private String reporterCountryCode;

    @JsonProperty("reporterCountryName")
    private String reporterCountryName;

    public ZonedDateTime getReportedAt() {
        return reportedAt;
    }

    public void setReportedAt(ZonedDateTime reportedAt) {
        this.reportedAt = reportedAt;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public List<Integer> getCategories() {
        return categories;
    }

    public void setCategories(List<Integer> categories) {
        this.categories = categories;
    }

    public Long getReporterId() {
        return reporterId;
    }

    public void setReporterId(Long reporterId) {
        this.reporterId = reporterId;
    }

    public String getReporterCountryCode() {
        return reporterCountryCode;
    }

    public void setReporterCountryCode(String reporterCountryCode) {
        this.reporterCountryCode = reporterCountryCode;
    }

    public String getReporterCountryName() {
        return reporterCountryName;
    }

    public void setReporterCountryName(String reporterCountryName) {
        this.reporterCountryName = reporterCountryName;
    }
}

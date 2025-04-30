package com.Backend.Model.AbuseIPDB.Blacklist;

import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

/*
 ** Blacklist Table Parameters for pagination
 ** allowing user to filter the table data
*/
public class BlacklistTableParameter {

    private String countryCode;
    private Integer abuseScore;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate lastReportedAt;
    private Pageable pageable;

    public BlacklistTableParameter() {}

    public BlacklistTableParameter(
            String countryCode,
            Integer abuseScore,
            LocalDate lastReportedAt,
            Pageable pageable
    ) {
        this.countryCode = countryCode;
        this.abuseScore = abuseScore;
        this.lastReportedAt = lastReportedAt;
        this.pageable = pageable;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public Integer getAbuseScore() {
        return abuseScore;
    }

    public void setAbuseScore(Integer abuseScore) {
        this.abuseScore = abuseScore;
    }

    public LocalDate getLastReportedAt() {
        return lastReportedAt;
    }

    public void setLastReportedAt(LocalDate lastReportedAt) {
        this.lastReportedAt = lastReportedAt;
    }

    public Pageable getPageable() {
        return pageable;
    }

    public void setPageable(Pageable pageable) {
        this.pageable = pageable;
    }
}

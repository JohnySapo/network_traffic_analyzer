package com.Backend.Model.AbuseIPDB.Blacklist;

import java.time.ZonedDateTime;

/*
 ** Blacklist Table Response of
 ** the application URL request (API URL)
 ** to the frontend.
*/
public class BlacklistTableResponse {

    private Long id;
    private String ipAddress;
    private String countryCode;
    private int abuseConfidenceScore;
    private ZonedDateTime lastReportedAt;

    public BlacklistTableResponse(
            Long id,
            String ipAddress,
            String countryCode,
            int abuseConfidenceScore,
            ZonedDateTime lastReportedAt
    ) {
        this.id = id;
        this.ipAddress = ipAddress;
        this.countryCode = countryCode;
        this.abuseConfidenceScore = abuseConfidenceScore;
        this.lastReportedAt = lastReportedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public int getAbuseConfidenceScore() {
        return abuseConfidenceScore;
    }

    public void setAbuseConfidenceScore(int abuseConfidenceScore) {
        this.abuseConfidenceScore = abuseConfidenceScore;
    }

    public ZonedDateTime getLastReportedAt() {
        return lastReportedAt;
    }

    public void setLastReportedAt(ZonedDateTime lastReportedAt) {
        this.lastReportedAt = lastReportedAt;
    }
}

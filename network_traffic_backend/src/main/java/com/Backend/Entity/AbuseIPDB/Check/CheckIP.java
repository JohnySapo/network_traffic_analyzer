package com.Backend.Entity.AbuseIPDB.Check;

import com.fasterxml.jackson.annotation.JsonProperty;

/*
 ** The CheckIP Entity class
 ** manages the structure and mapping of the data
 ** as JSON from AbuseIPDB API and service utility.
*/
import java.time.ZonedDateTime;
import java.util.List;

public class CheckIP {

    @JsonProperty("ipAddress")
    private String ipAddress;

    @JsonProperty("isPublic")
    private Boolean isPublic;

    @JsonProperty("ipVersion")
    private Integer ipVersion;

    @JsonProperty("isWhitelisted")
    private Boolean isWhitelisted;

    @JsonProperty("abuseConfidenceScore")
    private Integer abuseConfidenceScore;

    @JsonProperty("countryCode")
    private String countryCode;

    @JsonProperty("countryName")
    private String countryName;

    @JsonProperty("usageType")
    private String usageType;

    @JsonProperty("isp")
    private String isp;

    @JsonProperty("domain")
    private String domain;

    @JsonProperty("hostnames")
    private List<String> hostnames;

    @JsonProperty("isTor")
    private Boolean isTor;

    @JsonProperty("totalReports")
    private Integer totalReports;

    @JsonProperty("numDistinctUsers")
    private Integer numDistinctUsers;

    @JsonProperty("lastReportedAt")
    private ZonedDateTime lastReportedAt;

    @JsonProperty("reports")
    private List<CheckIPReporter> reports;


    public CheckIP(
            String ipAddress,
            Boolean isPublic,
            Integer ipVersion,
            Boolean isWhitelisted,
            Integer abuseConfidenceScore,
            String countryCode,
            String countryName,
            String usageType,
            String isp,
            String domain,
            List<String> hostnames,
            Boolean isTor,
            Integer totalReports,
            Integer numDistinctUsers,
            ZonedDateTime lastReportedAt,
            List<CheckIPReporter> reports
    ) {
        this.ipAddress = ipAddress;
        this.isPublic = isPublic;
        this.ipVersion = ipVersion;
        this.isWhitelisted = isWhitelisted;
        this.abuseConfidenceScore = abuseConfidenceScore;
        this.countryCode = countryCode;
        this.countryName = countryName;
        this.usageType = usageType;
        this.isp = isp;
        this.domain = domain;
        this.hostnames = hostnames;
        this.isTor = isTor;
        this.totalReports = totalReports;
        this.numDistinctUsers = numDistinctUsers;
        this.lastReportedAt = lastReportedAt;
        this.reports = reports;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Boolean getPublic() {
        return isPublic;
    }

    public void setPublic(Boolean aPublic) {
        isPublic = aPublic;
    }

    public Integer getIpVersion() {
        return ipVersion;
    }

    public void setIpVersion(Integer ipVersion) {
        this.ipVersion = ipVersion;
    }

    public Boolean getWhitelisted() {
        return isWhitelisted;
    }

    public void setWhitelisted(Boolean whitelisted) {
        isWhitelisted = whitelisted;
    }

    public Integer getAbuseConfidenceScore() {
        return abuseConfidenceScore;
    }

    public void setAbuseConfidenceScore(Integer abuseConfidenceScore) {
        this.abuseConfidenceScore = abuseConfidenceScore;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getUsageType() {
        return usageType;
    }

    public void setUsageType(String usageType) {
        this.usageType = usageType;
    }

    public String getIsp() {
        return isp;
    }

    public void setIsp(String isp) {
        this.isp = isp;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public List<String> getHostnames() {
        return hostnames;
    }

    public void setHostnames(List<String> hostnames) {
        this.hostnames = hostnames;
    }

    public Boolean getTor() {
        return isTor;
    }

    public void setTor(Boolean tor) {
        isTor = tor;
    }

    public Integer getTotalReports() {
        return totalReports;
    }

    public void setTotalReports(Integer totalReports) {
        this.totalReports = totalReports;
    }

    public Integer getNumDistinctUsers() {
        return numDistinctUsers;
    }

    public void setNumDistinctUsers(Integer numDistinctUsers) {
        this.numDistinctUsers = numDistinctUsers;
    }

    public ZonedDateTime getLastReportedAt() {
        return lastReportedAt;
    }

    public void setLastReportedAt(ZonedDateTime lastReportedAt) {
        this.lastReportedAt = lastReportedAt;
    }

    public List<CheckIPReporter> getReports() {
        return reports;
    }

    public void setReports(List<CheckIPReporter> reports) {
        this.reports = reports;
    }
}

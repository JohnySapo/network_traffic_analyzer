package com.Backend.Model.AbuseIPDB.Check;

import com.Backend.Entity.AbuseIPDB.Check.CheckIP;
import com.Backend.Entity.AbuseIPDB.Check.PaginatedIPReports;

import java.time.ZonedDateTime;
import java.util.List;

/*
 ** Check IP JSON mapping for AbuseIPDB response
*/
public class CheckIPWithPaginationReporters {
    private String ipAddress;
    private Boolean isPublic;
    private Integer ipVersion;
    private Boolean isWhitelisted;
    private Integer abuseConfidenceScore;
    private String countryCode;
    private String countryName;
    private String usageType;
    private String isp;
    private String domain;
    private List<String> hostnames;
    private Boolean isTor;
    private Integer totalReports;
    private Integer numDistinctUsers;
    private ZonedDateTime lastReportedAt;

    private PaginatedIPReports reports;

    public CheckIPWithPaginationReporters(CheckIP checkIP, PaginatedIPReports reports) {
        this.ipAddress = checkIP.getIpAddress();
        this.isPublic = checkIP.getPublic();
        this.ipVersion = checkIP.getIpVersion();
        this.isWhitelisted = checkIP.getWhitelisted();
        this.abuseConfidenceScore = checkIP.getAbuseConfidenceScore();
        this.countryCode = checkIP.getCountryCode();
        this.countryName = checkIP.getCountryName();
        this.usageType = checkIP.getUsageType();
        this.isp = checkIP.getIsp();
        this.domain = checkIP.getDomain();
        this.hostnames = checkIP.getHostnames();
        this.isTor = checkIP.getTor();
        this.totalReports = checkIP.getTotalReports();
        this.numDistinctUsers = checkIP.getNumDistinctUsers();
        this.lastReportedAt = checkIP.getLastReportedAt();
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

    public PaginatedIPReports getReports() {
        return reports;
    }

    public void setReports(PaginatedIPReports reports) {
        this.reports = reports;
    }
}

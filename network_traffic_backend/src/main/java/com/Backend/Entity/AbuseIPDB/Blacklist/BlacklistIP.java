package com.Backend.Entity.AbuseIPDB.Blacklist;

import jakarta.persistence.*;

import java.time.ZonedDateTime;

/*
 ** The BlacklistIP Entity class
 ** manages the structure and map of data
 ** to be store in the database PostgreSQL
 ** PostgreSQL Table: network_blacklist_ip
*/
@Entity
@Table(name = "network_blacklist_ip")
public class BlacklistIP {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address")
    private String ipAddress;
    @Column(name = "country_code")
    private String countryCode;
    @Column(name = "abuse_confidence_score")
    private int abuseConfidenceScore;
    @Column(name = "last_reported_at")
    private ZonedDateTime lastReportedAt;

    public BlacklistIP() {}

    public BlacklistIP(
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

    public BlacklistIP(
            String ipAddress,
            String countryCode,
            int abuseConfidenceScore,
            ZonedDateTime lastReportedAt
    ) {
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

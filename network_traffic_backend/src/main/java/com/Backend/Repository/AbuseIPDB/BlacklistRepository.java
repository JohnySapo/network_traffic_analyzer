package com.Backend.Repository.AbuseIPDB;

import com.Backend.Entity.AbuseIPDB.Blacklist.BlacklistIP;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Optional;

/*
 ** Blacklist Repository using Spring JPA data
 ** which implements data access layers via
 ** PostgresSQL Database
*/
@Repository
public interface BlacklistRepository extends JpaRepository<BlacklistIP, Long>, JpaSpecificationExecutor<BlacklistIP> {
    Optional<BlacklistIP> findByIpAddress(String ipAddress);
    Page<BlacklistIP> findByCountryCode(String countryCode, Pageable pageable);
    Page<BlacklistIP> findByAbuseConfidenceScore(int abuseConfidenceScore, Pageable pageable);
    Page<BlacklistIP> findByLastReportedAt(ZonedDateTime lastReportedAt, Pageable pageable);

    @Query("SELECT COUNT(b) from BlacklistIP b WHERE b.lastReportedAt > :dateTime")
    Long countIPsReportedByPeriod(ZonedDateTime dateTime);

    @Query("SELECT COUNT(b) FROM BlacklistIP b WHERE b.countryCode = 'IE' and b.lastReportedAt > :dateTime")
    Long countIPsReportedInIreland(ZonedDateTime dateTime);
}

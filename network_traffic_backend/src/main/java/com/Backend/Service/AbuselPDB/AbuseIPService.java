package com.Backend.Service.AbuselPDB;

import com.Backend.Entity.AbuseIPDB.Blacklist.BlacklistIP;
import com.Backend.Entity.AbuseIPDB.Check.CheckIP;
import com.Backend.Entity.AbuseIPDB.Check.CheckIPReporter;
import com.Backend.Entity.AbuseIPDB.Check.PaginatedIPReports;
import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistHeaderResponse;
import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistResponse;
import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistTableParameter;
import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistTableResponse;
import com.Backend.Model.AbuseIPDB.Check.CheckIPWithPaginationReporters;
import com.Backend.Model.AbuseIPDB.Check.CheckIpParameter;
import com.Backend.Model.AbuseIPDB.Check.CheckIpResponse;
import com.Backend.Repository.AbuseIPDB.BlacklistRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AbuseIPService {

    private String KEY_ANNOTATION = "key";
    private String ACCEPT_ANNOTATION = "accept";
    private String APPLICATION_FORMAT = String.valueOf(MediaType.APPLICATION_JSON);

    @Value("${abuseip.api.key}")
    private String KEY_VALUE;

    @Value("${abuseip.api.url.blacklist}")
    private String BLACKLIST_URL;

    @Value("${abuseip.api.url.check}")
    private String CHECK_URL;

    private final RestTemplate restTemplate;
    private final BlacklistRepository blacklistRepository;

    public AbuseIPService(RestTemplate restTemplate, BlacklistRepository blacklistRepository) {
        this.restTemplate = restTemplate;
        this.blacklistRepository = blacklistRepository;
    }

    /*
     ** Runs the saveBlacklistToDatabase method every 24 hours
     ** to update the database and to avoid waisting the 5 fetch request
     ** from AbuseIPDB API
    */
   @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    // @Scheduled(cron = "0 0 0 * * *")
    public void saveBlacklistToDatabase() {
        HttpHeaders header = new HttpHeaders();
        header.set(KEY_ANNOTATION, KEY_VALUE);
        header.set(ACCEPT_ANNOTATION, APPLICATION_FORMAT);

        HttpEntity<String> entity = new HttpEntity<>(header);

        ResponseEntity<BlacklistResponse> response =
                restTemplate.exchange(
                        BLACKLIST_URL,
                        HttpMethod.GET,
                        entity,
                        BlacklistResponse.class
                );

        List<BlacklistIP> list = response.getBody().getData();
        for(BlacklistIP IP : list) {
            blacklistRepository.findByIpAddress(IP.getIpAddress()).ifPresentOrElse(
                    exist -> {
                        exist.setCountryCode(IP.getCountryCode());
                        exist.setAbuseConfidenceScore(IP.getAbuseConfidenceScore());
                        exist.setLastReportedAt(IP.getLastReportedAt());
                        blacklistRepository.save(exist);
                    }, () -> {
                        blacklistRepository.save(IP);
                    });
        }
    }

    /*
     **  Accept an IP address as parameters for
     **  URL (check?ipAddress="IP ADDRESS HERE")
     **  to verify the integrity and confidence of it
    */
    public CheckIPWithPaginationReporters checkIpAddress(CheckIpParameter ipAddress, int page, int size) {
        if(page <= 0) page = 0;
        if(size <= 0) size = 8;

        HttpHeaders header = new HttpHeaders();
        header.set(KEY_ANNOTATION, KEY_VALUE);
        header.set(ACCEPT_ANNOTATION, APPLICATION_FORMAT);

        UriComponentsBuilder buildURL = UriComponentsBuilder.fromUriString(CHECK_URL)
                .queryParam("ipAddress", ipAddress.getIpAddress())
                .queryParam("maxAgeInDays", 30)
                .queryParam("verbose", "");

        HttpEntity<String> entity = new HttpEntity<>(header);

        ResponseEntity<CheckIpResponse> response = restTemplate.exchange(
                buildURL.toUriString(),
                HttpMethod.GET,
                entity,
                CheckIpResponse.class
        );

        CheckIP data = response.getBody().getData();
        List<CheckIPReporter> listOfReporters = data.getReports();

        int totalElements = listOfReporters.size();
        int firstIndex = Math.min(page * size, totalElements);
        int lastIndex = Math.min(firstIndex + size, totalElements);
        int totalPages = (int) Math.ceil((double) totalElements / size);

        List<CheckIPReporter> pagedReporters = listOfReporters.subList(firstIndex, lastIndex);

        PaginatedIPReports paginatedReporters = new PaginatedIPReports(
                page,
                size,
                totalElements,
                totalPages,
                pagedReporters
        );

        return new CheckIPWithPaginationReporters(data, paginatedReporters);
    }

    /*
     ** Return values for Report Header as
     ** They will be used o provided the values in a card
    */
    public BlacklistHeaderResponse countBlacklistHeaderReport() {
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime yesterday = now.minusHours(24);
        ZonedDateTime lastMonth = now.minusMonths(1);

        Long WorldWideLast24Hours = blacklistRepository.countIPsReportedByPeriod(yesterday);
        Long WorldWideLastMonth = blacklistRepository.countIPsReportedByPeriod(lastMonth);
        Long IrelandLast24Hours = blacklistRepository.countIPsReportedInIreland(yesterday);
        Long IrelandLastMonth = blacklistRepository.countIPsReportedInIreland(lastMonth);

        // Ternary verification to provide percentage of
        // Ireland 24 Hours and Last Month report
        // Compare to WoldWide reports otherwise if 0 return 0.0
        double IrelandLast24HoursPercentage = (WorldWideLast24Hours != 0) ?
                Math.round((IrelandLast24Hours * 100.0 / WorldWideLast24Hours) * 100.0) / 100.0 : 0.0;

        double IrelandLastMonthPercentage = (WorldWideLastMonth != 0) ?
                Math.round((IrelandLastMonth * 100.0 / WorldWideLastMonth) * 100.0) / 100.0 : 0.0;

        return new BlacklistHeaderResponse(
                WorldWideLast24Hours,
                WorldWideLastMonth,
                IrelandLast24Hours,
                IrelandLast24HoursPercentage,
                IrelandLastMonth,
                IrelandLastMonthPercentage
        );
    }

    /*
     ** Return pagination table that provides
     ** the Ip ID, Ip address, Country Code,
     ** Abuse Confidence Score & Last Reported at
     ** The method also includes filters for country code,
     ** abuse score and last report.
    */
    public Page<BlacklistTableResponse> getBlacklist(BlacklistTableParameter parameter) {

        ZonedDateTime reportedAt = parameter.getLastReportedAt() != null
                ? parameter.getLastReportedAt().atStartOfDay(ZoneOffset.UTC)
                : null;

        Page<BlacklistIP> result = blacklistRepository.findAll((root, query, builder) -> {
            List<Predicate> indicateFilterParameter = new ArrayList<>();

            if (parameter.getCountryCode() != null && !parameter.getCountryCode().isEmpty()) {
                indicateFilterParameter.add(builder.equal(root.get("countryCode"), parameter.getCountryCode()));
            }

            if (parameter.getAbuseScore() != null) {
                indicateFilterParameter.add(builder.equal(root.get("abuseConfidenceScore"), parameter.getAbuseScore()));
            }

            if (reportedAt != null) {
                indicateFilterParameter.add(builder.equal(root.get("lastReportedAt"), reportedAt));
            }

            return builder.and(indicateFilterParameter.toArray(new Predicate[0]));
        },
                parameter.getPageable()
        );

        return result.map(data -> new BlacklistTableResponse(
                data.getId(),
                data.getIpAddress(),
                data.getCountryCode(),
                data.getAbuseConfidenceScore(),
                data.getLastReportedAt()
        ));
    }
}

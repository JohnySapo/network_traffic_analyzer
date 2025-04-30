package com.Backend.Controller.AbuselPDB;

import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistHeaderResponse;
import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistTableParameter;
import com.Backend.Model.AbuseIPDB.Blacklist.BlacklistTableResponse;
import com.Backend.Model.AbuseIPDB.Check.CheckIPWithPaginationReporters;
import com.Backend.Model.AbuseIPDB.Check.CheckIpParameter;
import com.Backend.Service.AbuselPDB.AbuseIPService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/abuseIP")
public class AbuseIPController {

    private final AbuseIPService abuseIPService;

    public AbuseIPController(AbuseIPService abuseIPService) {
        this.abuseIPService = abuseIPService;
    }

    /*
     ** Blacklist endpoint that return a pageable table
     ** URL endpoint: localhost:port/abuseIP/blacklist
     ** filter parameter endpoint:
     ** localhost:port/abuseIP/blacklist?countryCode=US&page=0&size=12&sort=lastReportedAt,desc
    */
    @GetMapping("/blacklist")
    public ResponseEntity<Page<BlacklistTableResponse>> getBlacklistTable(
            @ModelAttribute BlacklistTableParameter parameter,
            @PageableDefault(size = 10, sort = "lastReportedAt", direction = Sort.Direction.ASC)
            Pageable pageable
    ) {
        parameter.setPageable(pageable);
        return ResponseEntity.ok(abuseIPService.getBlacklist(parameter));
    }

    /*
     ** Blacklist header report endpoint for cards' data
     ** URL endpoint: localhost:port/abuseIP/header-report
    */
    @GetMapping("/header-report")
    public BlacklistHeaderResponse getBlacklistHeaderReport() {
        return abuseIPService.countBlacklistHeaderReport();
    }

    /*
     ** Check IP address endpoint header that return a pageable table
     ** of Reporters to the single IP Address
     ** for the last 30 days
     ** URL endpoint: localhost:port/check
     ** search endpoint: localhost:port/check?ipAddress=0.0.0.0
    */
    @GetMapping("/check")
    public ResponseEntity<CheckIPWithPaginationReporters> getCheckIp(
            @RequestParam CheckIpParameter ipAddress,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        return ResponseEntity.ok(abuseIPService.checkIpAddress(ipAddress, page, size));
    }
}

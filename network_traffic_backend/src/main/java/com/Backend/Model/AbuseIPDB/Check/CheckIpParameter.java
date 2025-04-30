package com.Backend.Model.AbuseIPDB.Check;

/*
 ** Check IP Parameter for application API Request
 ** using IPAddress as parameter for search
 */
public class CheckIpParameter {

    private String ipAddress;

    public CheckIpParameter(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }
}

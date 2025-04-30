package com.Backend.Model.AbuseIPDB.Check;

import com.Backend.Entity.AbuseIPDB.Check.CheckIP;
import com.fasterxml.jackson.annotation.JsonProperty;

/*
 ** Check IP mapping for AbuseIPDB response
*/
public class CheckIpResponse {

    @JsonProperty("data")
    private CheckIP data;

    public CheckIpResponse(CheckIP data) {
        this.data = data;
    }

    public CheckIP getData() {
        return data;
    }

    public void setData(CheckIP data) {
        this.data = data;
    }
}

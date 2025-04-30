package com.Backend.Model.AbuseIPDB.Blacklist;

import com.Backend.Entity.AbuseIPDB.Blacklist.BlacklistIP;

import java.util.List;

/*
 ** Blacklist Response from API Request
 ** mapping JSON data
*/
public class BlacklistResponse {

    private List<BlacklistIP> data;

    public BlacklistResponse(List<BlacklistIP> data) {
        this.data = data;
    }

    public List<BlacklistIP> getData() {
        return data;
    }

    public void setData(List<BlacklistIP> data) {
        this.data = data;
    }
}

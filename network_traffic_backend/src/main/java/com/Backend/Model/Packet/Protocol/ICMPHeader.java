package com.Backend.Model.Packet.Protocol;

/*
 ** ICMP header traffic class for PackerLogger
*/
public class ICMPHeader {

    private int type;
    private int code;
    private String checkSum;

    public ICMPHeader() {}

    public ICMPHeader(int type, int code, String checkSum) {
        this.type = type;
        this.code = code;
        this.checkSum = checkSum;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getCheckSum() {
        return checkSum;
    }

    public void setCheckSum(String checkSum) {
        this.checkSum = checkSum;
    }
}

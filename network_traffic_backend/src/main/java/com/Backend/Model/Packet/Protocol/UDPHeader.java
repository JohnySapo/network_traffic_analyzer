package com.Backend.Model.Packet.Protocol;

/*
 ** UDP header traffic class for PackerLogger
*/
public class UDPHeader {

    private int sourcePort;
    private int destinationPort;
    private int length;
    private String checkSum;

    public UDPHeader() {}

    public UDPHeader(int sourcePort, int destinationPort, int length, String checkSum) {
        this.sourcePort = sourcePort;
        this.destinationPort = destinationPort;
        this.length = length;
        this.checkSum = checkSum;
    }

    public int getSourcePort() {
        return sourcePort;
    }

    public void setSourcePort(int sourcePort) {
        this.sourcePort = sourcePort;
    }

    public int getDestinationPort() {
        return destinationPort;
    }

    public void setDestinationPort(int destinationPort) {
        this.destinationPort = destinationPort;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getCheckSum() {
        return checkSum;
    }

    public void setCheckSum(String checkSum) {
        this.checkSum = checkSum;
    }
}

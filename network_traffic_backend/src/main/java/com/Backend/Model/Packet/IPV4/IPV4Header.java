package com.Backend.Model.Packet.IPV4;

/*
 ** IPV4 header traffic class for PackerLogger
*/
public class IPV4Header {

    private int version;
    private int internetHeaderLength;
    private int totalLength;
    private int identification;
    private int fragmentOffSet;
    private int timeToLive;
    private int protocol;
    private String headerCheckSum;
    private String sourceAddress;
    private String destinationAddress;

    private IPV4Flag flag;
    private TypeOfService typeOfService;

    public IPV4Header() {}

    public IPV4Header(
            int version,
            int internetHeaderLength,
            int totalLength,
            int identification,
            int fragmentOffSet,
            int timeToLive,
            int protocol,
            String headerCheckSum,
            String sourceAddress,
            String destinationAddress,
            IPV4Flag flag,
            TypeOfService typeOfService
    ) {
        this.version = version;
        this.internetHeaderLength = internetHeaderLength;
        this.totalLength = totalLength;
        this.identification = identification;
        this.fragmentOffSet = fragmentOffSet;
        this.timeToLive = timeToLive;
        this.protocol = protocol;
        this.headerCheckSum = headerCheckSum;
        this.sourceAddress = sourceAddress;
        this.destinationAddress = destinationAddress;
        this.flag = flag;
        this.typeOfService = typeOfService;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }

    public int getInternetHeaderLength() {
        return internetHeaderLength;
    }

    public void setInternetHeaderLength(int internetHeaderLength) {
        this.internetHeaderLength = internetHeaderLength;
    }

    public int getTotalLength() {
        return totalLength;
    }

    public void setTotalLength(int totalLength) {
        this.totalLength = totalLength;
    }

    public int getIdentification() {
        return identification;
    }

    public void setIdentification(int identification) {
        this.identification = identification;
    }

    public int getFragmentOffSet() {
        return fragmentOffSet;
    }

    public void setFragmentOffSet(int fragmentOffSet) {
        this.fragmentOffSet = fragmentOffSet;
    }

    public int getTimeToLive() {
        return timeToLive;
    }

    public void setTimeToLive(int timeToLive) {
        this.timeToLive = timeToLive;
    }

    public int getProtocol() {
        return protocol;
    }

    public void setProtocol(int protocol) {
        this.protocol = protocol;
    }

    public String getHeaderCheckSum() {
        return headerCheckSum;
    }

    public void setHeaderCheckSum(String headerCheckSum) {
        this.headerCheckSum = headerCheckSum;
    }

    public String getSourceAddress() {
        return sourceAddress;
    }

    public void setSourceAddress(String sourceAddress) {
        this.sourceAddress = sourceAddress;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public IPV4Flag getFlag() {
        return flag;
    }

    public void setFlag(IPV4Flag flag) {
        this.flag = flag;
    }

    public TypeOfService getTypeOfService() {
        return typeOfService;
    }

    public void setTypeOfService(TypeOfService typeOfService) {
        this.typeOfService = typeOfService;
    }
}

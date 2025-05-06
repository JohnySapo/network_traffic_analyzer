package com.Backend.Model.Packet.Ethernet;

/*
  ** Ethernet header traffic for PackerLogger
*/
public class EthernetHeader {

    private String destinationAddress;
    private String sourceAddress;
    private String type;

    public EthernetHeader() {}

    public EthernetHeader(String destinationAddress, String sourceAddress, String type) {
        this.destinationAddress = destinationAddress;
        this.sourceAddress = sourceAddress;
        this.type = type;
    }

    public String getDestinationAddress() {
        return destinationAddress;
    }

    public void setDestinationAddress(String destinationAddress) {
        this.destinationAddress = destinationAddress;
    }

    public String getSourceAddress() {
        return sourceAddress;
    }

    public void setSourceAddress(String sourceAddress) {
        this.sourceAddress = sourceAddress;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}

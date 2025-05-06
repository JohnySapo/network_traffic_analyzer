package com.Backend.Model.Packet.Protocol;

public class TCPHeader {

    private int sourcePort;
    private int destinationPort;
    private long sequenceNumber;
    private long acknowledgmentNumber;
    private int dataOffset;
    private int reserved;
    private int window;
    private String checksum;
    private int urgentPointer;
    private TCPFlag flags;

    public TCPHeader() {}

    public TCPHeader(
            int sourcePort,
            int destinationPort,
            long sequenceNumber,
            long acknowledgmentNumber,
            int dataOffset,
            int reserved,
            int window,
            String checksum,
            int urgentPointer,
            TCPFlag flags
    ) {
        this.sourcePort = sourcePort;
        this.destinationPort = destinationPort;
        this.sequenceNumber = sequenceNumber;
        this.acknowledgmentNumber = acknowledgmentNumber;
        this.dataOffset = dataOffset;
        this.reserved = reserved;
        this.window = window;
        this.checksum = checksum;
        this.urgentPointer = urgentPointer;
        this.flags = flags;
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

    public long getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(long sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public long getAcknowledgmentNumber() {
        return acknowledgmentNumber;
    }

    public void setAcknowledgmentNumber(long acknowledgmentNumber) {
        this.acknowledgmentNumber = acknowledgmentNumber;
    }

    public int getDataOffset() {
        return dataOffset;
    }

    public void setDataOffset(int dataOffset) {
        this.dataOffset = dataOffset;
    }

    public int getReserved() {
        return reserved;
    }

    public void setReserved(int reserved) {
        this.reserved = reserved;
    }

    public int getWindow() {
        return window;
    }

    public void setWindow(int window) {
        this.window = window;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public int getUrgentPointer() {
        return urgentPointer;
    }

    public void setUrgentPointer(int urgentPointer) {
        this.urgentPointer = urgentPointer;
    }

    public TCPFlag getFlags() {
        return flags;
    }

    public void setFlags(TCPFlag flags) {
        this.flags = flags;
    }
}

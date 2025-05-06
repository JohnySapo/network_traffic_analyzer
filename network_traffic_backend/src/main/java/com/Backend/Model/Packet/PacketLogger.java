package com.Backend.Model.Packet;

import com.Backend.Model.Packet.Ethernet.EthernetHeader;
import com.Backend.Model.Packet.HEXHeader.HEXStream;
import com.Backend.Model.Packet.IPV4.IPV4Header;
import com.Backend.Model.Packet.Protocol.DNSHeader;
import com.Backend.Model.Packet.Protocol.ICMPHeader;
import com.Backend.Model.Packet.Protocol.TCPHeader;
import com.Backend.Model.Packet.Protocol.UDPHeader;

public class PacketLogger {

    private String timeStamp;
    private EthernetHeader ethernetHeader;
    private IPV4Header ipv4Header;

    private TCPHeader tcpHeader;
    private UDPHeader udpHeader;
    private ICMPHeader icmpHeader;
    private DNSHeader dnsHeader;

    private HEXStream hexStream;

    public PacketLogger() {}

    public PacketLogger(
            String timeStamp,
            EthernetHeader ethernetHeader,
            IPV4Header ipv4Header,
            TCPHeader tcpHeader,
            UDPHeader udpHeader,
            ICMPHeader icmpHeader,
            DNSHeader dnsHeader,
            HEXStream hexStream) {
        this.timeStamp = timeStamp;
        this.ethernetHeader = ethernetHeader;
        this.ipv4Header = ipv4Header;
        this.tcpHeader = tcpHeader;
        this.udpHeader = udpHeader;
        this.icmpHeader = icmpHeader;
        this.dnsHeader = dnsHeader;
        this.hexStream = hexStream;
    }

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    public EthernetHeader getEthernetHeader() {
        return ethernetHeader;
    }

    public void setEthernetHeader(EthernetHeader ethernetHeader) {
        this.ethernetHeader = ethernetHeader;
    }

    public IPV4Header getIpv4Header() {
        return ipv4Header;
    }

    public void setIpv4Header(IPV4Header ipv4Header) {
        this.ipv4Header = ipv4Header;
    }

    public TCPHeader getTcpHeader() {
        return tcpHeader;
    }

    public void setTcpHeader(TCPHeader tcpHeader) {
        this.tcpHeader = tcpHeader;
    }

    public UDPHeader getUdpHeader() {
        return udpHeader;
    }

    public void setUdpHeader(UDPHeader udpHeader) {
        this.udpHeader = udpHeader;
    }

    public ICMPHeader getIcmpHeader() {
        return icmpHeader;
    }

    public void setIcmpHeader(ICMPHeader icmpHeader) {
        this.icmpHeader = icmpHeader;
    }

    public DNSHeader getDnsHeader() {
        return dnsHeader;
    }

    public void setDnsHeader(DNSHeader dnsHeader) {
        this.dnsHeader = dnsHeader;
    }

    public HEXStream getHexStream() {
        return hexStream;
    }

    public void setHexStream(HEXStream hexStream) {
        this.hexStream = hexStream;
    }
}

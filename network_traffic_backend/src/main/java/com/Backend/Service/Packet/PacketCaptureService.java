package com.Backend.Service.Packet;

import com.Backend.Model.Packet.Ethernet.EthernetHeader;
import com.Backend.Model.Packet.HEXHeader.HEXStream;
import com.Backend.Model.Packet.IPV4.IPV4Flag;
import com.Backend.Model.Packet.IPV4.IPV4Header;
import com.Backend.Model.Packet.IPV4.TypeOfService;
import com.Backend.Model.Packet.PacketLogger;
import com.Backend.Model.Packet.Protocol.*;
import org.pcap4j.core.*;
import org.pcap4j.packet.*;
import org.springframework.stereotype.Service;

import java.net.Inet4Address;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class PacketCaptureService {

    private List<PacketLogger> packetLoggers = new CopyOnWriteArrayList<>();
    private String targetIpAddressInterface = ""; // Past your local IP address or any target IP.

    public List<PacketLogger> getPacketLoggers() {
        return packetLoggers;
    }

    /*
     ** Start PcapJ network traffic packet capture
    */
    public void startNetworkPacketCapture() {
        new Thread(() -> {
            try {

                List<PcapNetworkInterface> listOfAllDevs = Pcaps.findAllDevs();
                PcapNetworkInterface interfaceDevice = null;

                for (PcapNetworkInterface listDevelop : listOfAllDevs) {
                    for (PcapAddress address : listDevelop.getAddresses()) {
                        if (
                                address.getAddress() instanceof Inet4Address &&
                                        address.getAddress().getHostAddress().equals(targetIpAddressInterface)
                        ) {
                            interfaceDevice = listDevelop;
                            break;
                        }
                    }

                    if (interfaceDevice != null) {
                        break;
                    }
                }

                if (interfaceDevice == null) {
                    System.err.println("No interface device has been found this IP Address: " + targetIpAddressInterface);
                }

                PcapHandle handler = interfaceDevice.openLive(65536, PcapNetworkInterface.PromiscuousMode.PROMISCUOUS, 1000);

                // Packet lister of the IP interface
                PacketListener packetListener = packet -> {
                    PacketLogger logger = new PacketLogger();
                    logger.setTimeStamp(handler.getTimestamp().toString());

                    /* ALL Setters for JSON API Call Response */

                    //  Set Ethernet Connection Packet Header (Source & Destination)
                    setEthernetPacketHeader(packet, logger);

                    // Set IPV4 Packer Header Information
                    setIPv4PacketHeader(packet, logger);

                    // Set TCP Protocol Header Information
                    setTCPPacketHeader(packet, logger);

                    // Set UDP Protocol Header Information
                    setUDPPacketHeader(packet, logger);

                    // Set ICMP Protocol Header Information
                    setICMPPacketHeader(packet, logger);

                    // Set DNS Protocol Header Information
                    setDNSPacketHeader(packet, logger);

                    packetLoggers.add(logger);
                };

                handler.loop(-1, packetListener);
                handler.close();

            } catch (PcapNativeException | InterruptedException |NotOpenException nativeException) {
                throw new RuntimeException(nativeException);
            }
        }).start();
    }

    /*
     ** The Set Ethernet Packet Header method defined the
     ** values of the IP Source & IP Destination as
     ** JSON format for the API Call to the Frontend
     */
    public void setEthernetPacketHeader(Packet packet, PacketLogger logger) {
        EthernetPacket ethernetPacket = packet.get(EthernetPacket.class);

        if (ethernetPacket != null) {
            EthernetHeader ethernetHeader = new EthernetHeader(
                    ethernetPacket.getHeader().getSrcAddr().toString(),
                    ethernetPacket.getHeader().getDstAddr().toString(),
                    ethernetPacket.getHeader().getType().toString()
            );
            logger.setEthernetHeader(ethernetHeader);
        }
    }

    /*
     ** The Set IPV4 Packet Header method defined the
     ** values of the IPv4 data as
     ** JSON format for the API Call to the Frontend
     */
    public void setIPv4PacketHeader(Packet packet, PacketLogger logger) {
        IpV4Packet ipV4Packet = packet.get(IpV4Packet.class);

        if (ipV4Packet != null) {

            String checkSumValue = "0x" + Integer.toHexString(ipV4Packet.getHeader().getHeaderChecksum());

            IPV4Flag ipv4Flag = new IPV4Flag(
                    ipV4Packet.getHeader().getReservedFlag(),
                    ipV4Packet.getHeader().getDontFragmentFlag(),
                    ipV4Packet.getHeader().getMoreFragmentFlag()
            );

            TypeOfService typeOfService = new TypeOfService(
                    ipV4Packet.getHeader().getTos().value(),
                    ipV4Packet.getHeader().getTos().value(),
                    ipV4Packet.getHeader().getTos().value()
            );

            IPV4Header ipv4Header = new IPV4Header(
                    ipV4Packet.getHeader().getVersion().value(),
                    ipV4Packet.getHeader().getIhl(),
                    ipV4Packet.getHeader().getTotalLength(),
                    ipV4Packet.getHeader().getIdentificationAsInt(),
                    ipV4Packet.getHeader().getFragmentOffset(),
                    ipV4Packet.getHeader().getTtl(),
                    ipV4Packet.getHeader().getProtocol().value(),
                    checkSumValue,
                    ipV4Packet.getHeader().getSrcAddr().getHostAddress(),
                    ipV4Packet.getHeader().getDstAddr().getHostAddress(),
                    ipv4Flag,
                    typeOfService
            );

            logger.setIpv4Header(ipv4Header);
        }
    }

    /*
     ** The TCP Protocol Packet Header method defined the
     ** values of the TCP data as
     ** JSON format for the API Call to the Frontend
     */
    public void setTCPPacketHeader(Packet packet, PacketLogger logger) {
        TcpPacket tcpPacket = packet.get(TcpPacket.class);

        if (tcpPacket != null) {

            String checkSumValue = "0x" + Integer.toHexString(tcpPacket.getHeader().getChecksum());

            TCPFlag tcpFlag = new TCPFlag(
                    tcpPacket.getHeader().getUrg(),
                    tcpPacket.getHeader().getAck(),
                    tcpPacket.getHeader().getPsh(),
                    tcpPacket.getHeader().getRst(),
                    tcpPacket.getHeader().getSyn(),
                    tcpPacket.getHeader().getFin()
            );

            TCPHeader tcpHeader = new TCPHeader(
                    tcpPacket.getHeader().getSrcPort().valueAsInt(),
                    tcpPacket.getHeader().getDstPort().valueAsInt(),
                    tcpPacket.getHeader().getSequenceNumber(),
                    tcpPacket.getHeader().getAcknowledgmentNumber(),
                    tcpPacket.getHeader().getDataOffset(),
                    tcpPacket.getHeader().getReserved(),
                    tcpPacket.getHeader().getWindow(),
                    checkSumValue,
                    tcpPacket.getHeader().getUrgentPointer(),
                    tcpFlag
            );

            HEXStream hexStream = new HEXStream();
            if (tcpPacket.getPayload() != null) {
                byte[] pureData = tcpPacket.getPayload().getRawData();
                hexStream.setLength(pureData.length);
                hexStream.setHexStream(defineBytesToHEXStream(pureData));
            }

            logger.setTcpHeader(tcpHeader);
            logger.setHexStream(hexStream);
        }
    }

    /*
     ** The UDP Protocol Packet Header method defined the
     ** values of the TCP data as
     ** JSON format for the API Call to the Frontend
     */
    public void setUDPPacketHeader(Packet packet, PacketLogger logger) {
        UdpPacket udpPacket = packet.get(UdpPacket.class);

        if (udpPacket != null) {
            String checkSum = String.format("0x%04x", udpPacket.getHeader().getChecksum());
            UDPHeader udpHeader = new UDPHeader(
                    udpPacket.getHeader().getSrcPort().value(),
                    udpPacket.getHeader().getDstPort().value(),
                    udpPacket.getHeader().getLength(),
                    checkSum
            );

            logger.setUdpHeader(udpHeader);
        }
    }

    /*
     ** The ICMP Protocol Packet Header method defined the
     ** values of the TCP data as
     ** JSON format for the API Call to the Frontend
     */
    public void setICMPPacketHeader(Packet packet, PacketLogger logger) {
        IcmpV4CommonPacket icmpPacket = packet.get(IcmpV4CommonPacket.class);

        if (icmpPacket != null) {
            String checkSum = String.format("0x%04x", icmpPacket.getHeader().getChecksum());

            ICMPHeader icmpHeader = new ICMPHeader(
                    icmpPacket.getHeader().getType().value(),
                    icmpPacket.getHeader().getCode().value(),
                    checkSum
            );

            logger.setIcmpHeader(icmpHeader);
        }
    }

    /*
     ** The DNS Protocol Packet Header method defined the
     ** values of the TCP data as
     ** JSON format for the API Call to the Frontend
     */
    public void setDNSPacketHeader(Packet packet, PacketLogger logger) {
        DnsPacket dnsPacket = packet.get(DnsPacket.class);

        if (dnsPacket != null) {
            DNSHeader dnsHeader = new DNSHeader(
                    dnsPacket.getHeader().getId(),
                    dnsPacket.getHeader().getOpCode().name(),
                    dnsPacket.getHeader().getrCode().name(),
                    dnsPacket.getHeader().getQdCountAsInt(),
                    dnsPacket.getHeader().getAnCount()
            );

            logger.setDnsHeader(dnsHeader);
        }
    }

    /*
     ** Transform Bytes to HEX support method
     ** for TCP Header of HEX Stream header packet
     */
    public String defineBytesToHEXStream(byte[] bytes) {
        StringBuilder builder = new StringBuilder();

        for (byte b : bytes) {
            builder.append(String.format("%02x", b)).append(" ");
        }

        return builder.toString().trim();
    }
}

import { useMemo } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Shield, Zap, Database } from "lucide-react";
import { PacketCaptureModel } from "@/model/packet";
import { PacketToolTip } from "./packet-tooltip";

type PacketSummaryProps = {
  packet: PacketCaptureModel[];
}

export const PacketSummary = ({ packet }: PacketSummaryProps) => {
  const stats = useMemo(() => {
    const totalPacketsLength = packet.length;
    const tcpCountLengthValues = packet.filter((packet) => packet.tcpHeader).length;
    const udpCountLengthValues = packet.filter((packet) => packet.udpHeader).length;
    const icmpCountLengthValues = packet.filter((packet) => packet.icmpHeader).length;
    const otherCountLengthValues = totalPacketsLength - tcpCountLengthValues - udpCountLengthValues - icmpCountLengthValues;

    const uniqueIPAddresses = new Set<string>();

    packet.forEach((packet) => {
      if(packet.ipv4Header) {
        uniqueIPAddresses.add(packet.ipv4Header.sourceAddress);
        uniqueIPAddresses.add(packet.ipv4Header.destinationAddress);
      }
    });

    const webTraffic = packet.filter(
      (p) => p.tcpHeader && (p.tcpHeader.destinationPort === 80 || p.tcpHeader.destinationPort === 443),
    ).length;
  
    const totalPacketDataTransferred = packet.reduce((total, packet) => {
      const length = packet.ipv4Header?.totalLength ?? 0;
      return total + length;
    }, 0);

    return {
      totalPacketsLength,
      tcpCountLengthValues,
      udpCountLengthValues,
      icmpCountLengthValues,
      otherCountLengthValues,
      uniqueIPCount: uniqueIPAddresses.size,
      webTraffic,
      totalPacketDataTransferred,
    }
  }, [packet]);

  const formatDataToBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const index = Math.floor(Math.log(bytes) / Math.log(k));

    return Number.parseFloat((bytes / Math.pow(k, index)).toFixed(2)) + " " + sizes[index];
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            Total Activity
            <PacketToolTip content="The total number of connections detected on your network" />
          </CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPacketsLength}</div>
          <p className="text-xs text-muted-foreground">Connections detected</p>
          <div className="mt-3 flex items-center gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
              <span>TCP: {stats.tcpCountLengthValues}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>UDP: {stats.udpCountLengthValues}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span>ICMP: {stats.icmpCountLengthValues}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            Unique Computers
            <PacketToolTip content="How many different computers are communicating on your network" />
          </CardTitle>
          <Globe className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.uniqueIPCount}</div>
          <p className="text-xs text-muted-foreground">Different computers connected</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            Web Browsing
            <PacketToolTip content="Connections to websites and web services" />
          </CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.webTraffic}</div>
          <p className="text-xs text-muted-foreground">Website connections</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            Data Transferred
            <PacketToolTip content="Total amount of data sent across your network" />
          </CardTitle>
          <Database className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatDataToBytes(stats.totalPacketDataTransferred)}</div>
          <p className="text-xs text-muted-foreground">Total network data</p>
        </CardContent>
      </Card>
    </>
  )
}

export default PacketSummary;


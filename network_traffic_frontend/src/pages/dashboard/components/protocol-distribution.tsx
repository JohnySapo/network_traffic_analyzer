import { useMemo } from "react";
import { PacketCaptureModel } from "@/model/packet";
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  Legend 
} from "recharts";

type ProtocolDistributionProps = {
  packet: PacketCaptureModel[];
}

type ScatterPoint = {
  x: number;
  y: number;
  z: number;
  name: string;
  protocol: string;
  color: string;
}

export const ProtocolDistribution = ({ packet }: ProtocolDistributionProps) => {
  const scatterData = useMemo(() => {
    const protocolByGroups: Record<string, Record<string, number>> = {}

    packet.forEach((packet) => {
      let protocol = "Other";
      let port = "unknown";

      if (packet.tcpHeader) {
        protocol = "TCP";
        port = packet.tcpHeader.destinationPort.toString()
      } else if (packet.udpHeader) {
        protocol = "UDP";
        port = packet.udpHeader.destinationPort.toString()
      } else if (packet.icmpHeader) {
        protocol = "ICMP";
        port = packet.icmpHeader.type.toString()
      } else if (packet.dnsHeader) {
        protocol = "DNS";
        port = "53";
      }

      if (!protocolByGroups[protocol]) {
        protocolByGroups[protocol] = {}
      }

      if (!protocolByGroups[protocol][port]) {
        protocolByGroups[protocol][port] = 0;
      }

      protocolByGroups[protocol][port]++;
    })

    const scatterPoints: ScatterPoint[] = []
    const protocolByColors: Record<string, string> = {
      TCP: "#0088FE",
      UDP: "#00C49F",
      ICMP: "#FFBB28",
      DNS: "#8884d8",
      Other: "#FF8042",
    }

    Object.entries(protocolByGroups).forEach(([protocol, ports], protocolIndex) => {
      Object.entries(ports).forEach(([port, count]) => {
        scatterPoints.push({
          x: protocolIndex * 100 + Math.random() * 80, 
          y: (Number.parseInt(port) % 100) + Math.random() * 50,
          z: Math.min(count * 5, 50),
          name: `${protocol} (Port ${port})`,
          protocol,
          color: protocolByColors[protocol] || "#999",
        });
      });
    });

    const protocolInformation = Object.keys(protocolByGroups).map((protocol) => ({
      name: protocol,
      color: protocolByColors[protocol] || "#999",
      points: scatterPoints.filter((point) => point.protocol === protocol),
    }));

    return protocolInformation;
  }, [packet]);

  const CustomizedTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md p-2 shadow-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">Count: {Math.round(data.z / 5)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis type="number" dataKey="x" name="protocol" hide />
        <YAxis type="number" dataKey="y" name="port" hide />
        <ZAxis type="number" dataKey="z" range={[20, 500]} />
        <Tooltip content={<CustomizedTooltip />} />
        <Legend
          payload={scatterData.map((item) => ({
            value: item.name,
            type: "circle",
            color: item.color,
          }))}
        />
        {scatterData.map((protocol) => (
          <Scatter
            key={protocol.name}
            name={protocol.name}
            data={protocol.points}
            fill={protocol.color}
            shape="circle"
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  )
}

export default ProtocolDistribution;
import { PacketCaptureModel } from "@/model/packet";
import { useMemo } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from "recharts";

type PacketTimelineProps = {
  packet: PacketCaptureModel[];
}

export const PacketTimeline = ({ packet }: PacketTimelineProps) => {
  const timelineData = useMemo(() => {
    // Group packets by time and protocol
    const timeGroups: Record<string, { TCP: number; UDP: number; ICMP: number; DNS: number; Other: number }> = {}

    packet.forEach((packet) => {
      // Extract minute for grouping
      const timestamp = packet.timeStamp
      const minute = timestamp.substring(0, 16) // Extract YYYY-MM-DD HH:MM

      if (!timeGroups[minute]) {
        timeGroups[minute] = { TCP: 0, UDP: 0, ICMP: 0, DNS: 0, Other: 0 }
      }

      // Increment the appropriate protocol counter
      if (packet.dnsHeader) {
        timeGroups[minute].DNS++
      } else if (packet.tcpHeader) {
        timeGroups[minute].TCP++
      } else if (packet.udpHeader) {
        timeGroups[minute].UDP++
      } else if (packet.icmpHeader) {
        timeGroups[minute].ICMP++
      } else {
        timeGroups[minute].Other++
      }
    })

    // Convert to timeline data points
    return Object.entries(timeGroups)
      .map(([time, counts]) => ({
        time: time.split(" ")[1], // Just show the time HH:MM
        ...counts,
      }))
      .sort((a, b) => a.time.localeCompare(b.time))
      .slice(-10) // Last 10 time periods
  }, [packet])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-2 shadow-sm">
          <p className="font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value} packets`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={timelineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="TCP" stroke="#0088FE" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="UDP" stroke="#00C49F" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="ICMP" stroke="#FFBB28" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="DNS" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="Other" stroke="#FF8042" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PacketTimeline;
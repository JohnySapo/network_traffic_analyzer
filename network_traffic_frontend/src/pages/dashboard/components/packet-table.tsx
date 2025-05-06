import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { PacketCaptureModel } from "@/model/packet";
import { PacketToolTip } from "./packet-tooltip";
import { 
  getConnectionByType,
  getFormatedTimeStamp,
  getProtocolByColor,
} from "@/lib/packet/packet-utils";

type PacketTableProps = {
  packet: PacketCaptureModel[];
  inSelectPacketValue: (packet: PacketCaptureModel) => void;
  selectedPacketValue: PacketCaptureModel | null;
}

export const PacketTable = ({ packet, inSelectPacketValue, selectedPacketValue }: PacketTableProps) => {
  return (
    <div className="overflow-auto max-h-[600px] border-t">
      <Table>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow>
            <TableHead className="w-[180px]">Time</TableHead>
            <TableHead>
              From
              <PacketToolTip content="The computer that started the connection" />
            </TableHead>
            <TableHead>
              To
              <PacketToolTip content="The computer receiving the connection" />
            </TableHead>
            <TableHead className="w-[100px]">
              How
              <PacketToolTip content="The method computers use to talk to each other" />
            </TableHead>
            <TableHead className="w-[120px]">
              What
              <PacketToolTip content="The type of activity happening" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packet.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No packet activity to display right now
              </TableCell>
            </TableRow>
          ) : (
            packet.map((packet, index) => {
              const isSelected =
                selectedPacketValue?.timeStamp === packet.timeStamp &&
                selectedPacketValue?.ipv4Header.sourceAddress === packet.ipv4Header.sourceAddress &&
                selectedPacketValue?.ipv4Header.destinationAddress === packet.ipv4Header.destinationAddress

              return (
                <TableRow
                  key={`${packet.timeStamp}-${index}`}
                  className={`cursor-pointer ${isSelected ? "bg-muted" : ""} hover:bg-muted/50 scrollbar`}
                  onClick={() => inSelectPacketValue(packet)}
                >
                  <TableCell className="font-mono text-xs">{getFormatedTimeStamp(packet.timeStamp)}</TableCell>
                  <TableCell>
                    {packet.ipv4Header.sourceAddress}
                    {packet.tcpHeader && (
                      <span className="text-muted-foreground text-xs ml-1">:{packet.tcpHeader.sourcePort}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {packet.ipv4Header.destinationAddress}
                    {packet.tcpHeader && (
                      <span className="text-muted-foreground text-xs ml-1">:{packet.tcpHeader.destinationPort}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getProtocolByColor(packet)}`}>
                      {packet.tcpHeader ? "TCP" : packet.udpHeader ? "UDP" : packet.icmpHeader ? "ICMP" : "Other"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {getConnectionByType(packet)}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default PacketTable;
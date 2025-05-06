import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { 
  getConnectionByItsPort, 
  getConnectionByStatus,
  getFormatedTimeStamp, 
  getServiceByProtocolName 
} from "@/lib/packet/packet-utils";
import { PacketCaptureModel } from "@/model/packet";

type PacketInformationProps = {
  packet: PacketCaptureModel;
}

export const PacketInformation = ({ packet }: PacketInformationProps) => {
  return (
    <div className="space-y-4 text-sm">
      <div>
        <h3 className="font-medium mb-1">Time</h3>
        <p className="font-mono text-xs">{getFormatedTimeStamp(packet.timeStamp)}</p>
      </div>
      <Separator />
      <Accordion type="multiple" defaultValue={["basic", "ipv4"]}>
        <AccordionItem value="basic">
          <AccordionTrigger className="py-2">Connection Summary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Connection Type:</span>
                <span>
                  {packet.tcpHeader ? "Direct Connection" : packet.udpHeader ? "Quick Message" : "Network Message"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Purpose:</span>
                <span>{getConnectionByItsPort(packet)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="ipv4">
          <AccordionTrigger className="py-2">Computer Addresses</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">From Computer:</span>
                <span className="font-mono">{packet.ipv4Header.sourceAddress}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">To Computer:</span>
                <span className="font-mono">{packet.ipv4Header.destinationAddress}</span>
              </div>
              <div className="grid grid-cols-2 gap-1">
                <span className="text-muted-foreground">Distance:</span>
                <span>{packet.ipv4Header.timeToLive > 64 ? "Far away" : "Nearby network"}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {packet.tcpHeader && (
          <AccordionItem value="tcp">
            <AccordionTrigger className="py-2">Connection Details</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">From Service:</span>
                  <span>{getServiceByProtocolName(packet.tcpHeader.sourcePort)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">To Service:</span>
                  <span>{getServiceByProtocolName(packet.tcpHeader.destinationPort)}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Connection Status:</span>
                  <span>{getConnectionByStatus(packet.tcpHeader.flags)}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {packet.udpHeader && (
          <AccordionItem value="udp">
            <AccordionTrigger className="py-2">UDP Information</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Source Port:</span>
                  <span>{packet.udpHeader.sourcePort}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Destination Port:</span>
                  <span>{packet.udpHeader.destinationPort}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Length:</span>
                  <span>{packet.udpHeader.length}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {packet.icmpHeader && (
          <AccordionItem value="icmp">
            <AccordionTrigger className="py-2">Network Message</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{packet.icmpHeader.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Code:</span>
                  <span>{packet.icmpHeader.code}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {packet.dnsHeader && (
          <AccordionItem value="dns">
            <AccordionTrigger className="py-2">Domain Name Lookup</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Request ID:</span>
                  <span>{packet.dnsHeader.transactionID}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Operation:</span>
                  <span>{packet.dnsHeader.operationCode}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Status:</span>
                  <span>{packet.dnsHeader.responseCode}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Questions:</span>
                  <span>{packet.dnsHeader.questionCount}</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">Answers:</span>
                  <span>{packet.dnsHeader.answerRecordCount}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  )
}

export default PacketInformation;
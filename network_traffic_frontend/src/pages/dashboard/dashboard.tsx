import { useState, useEffect } from "react";
import { 
  Activity, 
  Filter, 
  Info, 
  RefreshCw, 
  Shield, 
  Zap 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger } from "@/components/ui/tooltip";
import { PacketToolTip } from "./components/packet-tooltip";
import { PacketTable } from "./components/packet-table";
import { PacketCaptureModel } from "@/model/packet";
import { PacketTimeline } from "./components/packet-timeline";
import { PacketInformation } from "./components/packet-information";
import { PacketSummary } from "./components/packet-summary";
import { ProtocolDistribution } from "./components/protocol-distribution";
import { useAuth } from "@/context/user-authentication";
import { PacketCaptureStartAPI, PacketCaptureLoggerReportAPI } from "@/service/packet-service";

export const Dashboard = () => {
  const [packetCaptureData, setPacketCaptureData] = useState<PacketCaptureModel[]>([]);
  const [filteredPacketCapture, setFilteredPacketCapture] = useState<PacketCaptureModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPacket, setSelectedPacket] = useState<PacketCaptureModel | null>(null);
  const [isLivePacket, setisLivePacket] = useState(true);

  const { token } = useAuth();

  useEffect(() => {
    if(!token) return;
    PacketCaptureStartAPI(token);
  }, [token]);

  useEffect(() => {
    if (!isLivePacket || !token) return;
  
    const interval = setInterval(async () => {
      const response = await PacketCaptureLoggerReportAPI(token);
  
      if (response?.data.length) {
        const newPacketCapture = response.data.map(packet => ({
          ...packet,
          timeStamp: new Date().toISOString().replace("T", " ").substring(0, 23),
        }));
  
        setPacketCaptureData((preview) => {
          const updatedPacketCapture = [...newPacketCapture, ...preview].slice(0, 100);
          setFilteredPacketCapture(filterPacket(updatedPacketCapture, searchTerm));
  
          return updatedPacketCapture;
        });
      }
    }, 999);
  
    return () => clearInterval(interval);
  }, [isLivePacket, token, searchTerm]);
  

  const filterPacket = (data: PacketCaptureModel[], term: string) => {
    if (!term) return data;

    return data.filter(
      (packet) =>
        packet.ipv4Header?.sourceAddress.includes(term) ||
        packet.ipv4Header?.destinationAddress.includes(term) ||
        (packet.tcpHeader?.sourcePort.toString() || "").includes(term) ||
        (packet.tcpHeader?.destinationPort.toString() || "").includes(term),
    );
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    setFilteredPacketCapture(filterPacket(packetCaptureData, term))
  }

  return (
    <>
      <header className="flex items-center border-b bg-background rounded-lg px-4 py-3">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <Activity className="h-5 w-5 text-primary" />
          <span>Network Activity Viewer</span>
          <PacketToolTip content="This dashboard shows you the connections between your computer and other computers on the network." />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isLivePacket ? "default" : "outline"}
                  size="sm"
                  onClick={() => setisLivePacket(!isLivePacket)}
                  className="gap-1"
                >
                  <RefreshCw className={`h-4 w-4 ${isLivePacket ? "animate-spin" : ""}`} />
                  {isLivePacket ? "Live" : "Paused"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLivePacket ? "Pause" : "Resume"} live updates</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="grid gap-4 p-4 md:grid-cols-4">
            <PacketSummary packet={packetCaptureData} />
          </div>

          <div className="p-4 pt-0 grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Protocol Distribution
                  <PacketToolTip content="This chart shows the different types of network protocols and their frequency" />
                </CardTitle>
                <CardDescription>Each dot represents a connection grouped by protocol</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ProtocolDistribution packet={packetCaptureData} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  Packet Timeline
                  <PacketToolTip content="This chart shows network activity over time by protocol" />
                </CardTitle>
                <CardDescription>Network activity patterns by protocol type</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PacketTimeline packet={packetCaptureData} />
              </CardContent>
            </Card>
          </div>

          <div className="p-4 pt-0 grid gap-4 grid-cols-1 md:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    Recent Connections
                    <PacketToolTip content="This shows the most recent connections between computers on your network." />
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={isLivePacket ? "default" : "outline"} className="gap-1">
                      <Zap className="h-3 w-3" />
                      {isLivePacket ? "Live Updates" : "Paused"}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Filter className="h-3 w-3" />
                      {filteredPacketCapture.length} packets
                    </Badge>
                  </div>
                </div>
                <CardDescription>Activity between your network and other computers</CardDescription>
                <div className="pt-2">
                  <Input
                    placeholder="Search for a connection..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <PacketTable packet={filteredPacketCapture} inSelectPacketValue={setSelectedPacket} selectedPacketValue={selectedPacket} />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Connection Details
                </CardTitle>
                <CardDescription>
                  {selectedPacket ? "More information about this connection" : "Select a connection to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPacket ? (
                  <PacketInformation packet={selectedPacket} />
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                    <Shield className="h-12 w-12 mb-4 opacity-20" />
                    <p>Click on any connection in the table to see more information</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard;

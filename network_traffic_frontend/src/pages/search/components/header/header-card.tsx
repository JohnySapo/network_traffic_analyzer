import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getDateSetup } from "@/lib/check/check-utils";
import { IPAddressInformation } from "@/model/check";
import { format, formatDistanceToNow } from "date-fns";
import { Check, AlertCircle, Globe } from "lucide-react";

export const SearchHeader = ({ ipAddressData }: IPAddressInformation) => {

  const renderRiskAbuseScore = (abuseScore: number) => {
    let color = "bg-green-100 text-green-800"
    if (abuseScore > 80) {
      color = "bg-red-100 text-red-800"
    } else if (abuseScore > 50) {
      color = "bg-yellow-100 text-yellow-800"
    } else if (abuseScore > 20) {
      color = "bg-blue-100 text-blue-800"
    }

    return (
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>{abuseScore}%</div>
    )
  }

  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-1 @5xl/main:grid-cols-1
      grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card shadow dark:shadow-neutral-100/50 shadow-neutral-950/50 mt-5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>IP Information: {ipAddressData.ipAddress}</span>
            <div className="flex items-center gap-2">
              {ipAddressData.whitelisted && (
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  <Check className="w-3 h-3 mr-1" /> Whitelisted
                </Badge>
              )}
              {ipAddressData.tor && (
                <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                  <AlertCircle className="w-3 h-3 mr-1" /> TOR Exit Node
                </Badge>
              )}
              <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                <Globe className="w-3 h-3 mr-1" /> IPv{ipAddressData.ipVersion}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Location</h3>
              <p className="mt-1 flex items-center">
                {ipAddressData.countryName}
                <img src={`https://flagcdn.com/w40/${ipAddressData.countryCode.toLowerCase()}.png`} width="25" height="20" alt={ipAddressData.countryName} className="ms-1" />
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">ISP</h3>
              <p className="mt-1">{ipAddressData.isp}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Domain</h3>
              <p className="mt-1">{ipAddressData.domain}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Usage Type</h3>
              <p className="mt-1">{ipAddressData.usageType}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Hostname</h3>
              <p className="mt-1 truncate">
                {ipAddressData.hostnames.length > 0 ? (
                  ipAddressData.hostnames.join(", ")
                ) : (
                  <>
                    <span className="text-blue-300 italic">undefined</span>
                  </>
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Last Reported</h3>
              <div className="flex flex-col">
                <span>
                  {format(new Date(ipAddressData.lastReportedAt), getDateSetup())}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(ipAddressData.lastReportedAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Reports</h3>
              <p className="mt-1">{ipAddressData.totalReports}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Distinct Reporters</h3>
              <p className="mt-1">{ipAddressData.numDistinctUsers}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Abuse Confidence Score</h3>
              <p className="mt-1">{renderRiskAbuseScore(ipAddressData.abuseConfidenceScore)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SearchHeader;
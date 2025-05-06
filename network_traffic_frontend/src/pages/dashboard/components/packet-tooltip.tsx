import { InfoIcon } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

type PacketToolTipProps = {
  content: string;
  children?: React.ReactNode;
}

export const PacketToolTip = ({ content, children }: PacketToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex items-center cursor-help">
            {children || <InfoIcon className="h-4 w-4 text-muted-foreground ml-1" />}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default PacketToolTip;
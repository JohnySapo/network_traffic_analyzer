import { BlacklistModel } from "@/model/blacklist";
import { format } from "date-fns";
import { toast } from "sonner";

/*
** Date setup for date-fns libary 
** to format the lastReportedAt from
** backend to display the date properly
** to frontend: Month day, year, hour:minute AM/PM
** i.e, Marc 3, 2025, 5:00 PM
*/
export const getDateSetup = (): string => "MMM d, yyyy, h:mm a"; 

/*
** Clipboard Feature to allow the user
** to copy the row's data
** (IP, Country, Score & Report Date)
** and display the message via sonner (toast / pop up window)
*/
export const blacklistTableCopyDataOfTheRow = (row: BlacklistModel) => {
  
    const formattedDate = typeof row.lastReportedAt === "string"
      ? format(new Date(row.lastReportedAt), getDateSetup())
      : format(row.lastReportedAt, getDateSetup());
  
    const clipboardCopySetup = `
      IP Address: ${row.ipAddress}, 
      Country/Code: ${row.countryCode}, 
      Abuse Meter Score: ${row.abuseConfidenceScore}, 
      Last Reported At: ${formattedDate}`;
    navigator.clipboard.writeText(clipboardCopySetup);
  
    toast("🖊️ IP information has been copied to clipboard!")
}
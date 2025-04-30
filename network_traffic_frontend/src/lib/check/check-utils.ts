
/*
** Date setup for date-fns libary 
** to format the lastReportedAt from
** backend to display the date properly
** to frontend: Month day, year, hour:minute AM/PM
** i.e, Marc 3, 2025, 5:00 PM
*/
export const getDateSetup = (): string => "MMM d, yyyy, h:mm a"; 

/*
** Allow the table to hae a truncated comments
** for all Reporters if the comment if bigger than
** 100 lenght in its subtring.
*/
export const truncateReportersComments = (comment: string, maxLength = 100) => {
    if (comment.length <= maxLength) return comment;
    return comment.substring(0, maxLength) + "..."
}

/*
** The Category values represents what a User/Reporter 
** flagged the IP Address as Abuse and which
** abuse attempt it has tried to their local machine or server 
** All the content can be found on the AbuseIPDB URL
** https://www.abuseipdb.com/categories
*/
export const getCategoryNameByValue = (categoryId: number) => {
    const categories: Record<number, string> = {
        1: "DNS Compromise",
        2: "DNS Poisoning",
        3: "Fraud Orders",
        4: "DDoS Attack",
        5: "FTP Brute-Force",
        6: "Ping of Death",
        7: "Phishing",
        8: "Fraud VoIP",
        9: "Open Proxy",
        10: "Web Spam",
        11: "Email Spam",
        12: "Blog Spam",
        13: "VPN IP",
        14: "Port Scan",
        15: "Hacking",
        16: "SQL Injection",
        17: "Spoofing",
        18: "Brute-Force",
        19: "Bad Web Bot",
        20: "Exploited Host",
        21: "Web App Attack",
        22: "SSH",
        23: "IoT Targeted",
    }
    return categories[categoryId] || `Category ${categoryId}`;
}


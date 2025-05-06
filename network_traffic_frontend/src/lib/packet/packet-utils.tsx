import { PacketCaptureModel, TCPFlags } from "@/model/packet"

export function getProtocolByColor(packet: PacketCaptureModel): string {
  if (packet.tcpHeader) {
    return "text-primary border-primary";
  } else if (packet.udpHeader) {
    return "text-green-500 border-green-500";
  } else if (packet.icmpHeader) {
    return "text-yellow-500 border-yellow-500";
  } else if (packet.dnsHeader) {
    return "text-purple-500 border-purple-500";
  } else {
    return "text-muted-foreground";
  }
}

export function getFormatedTimeStamp(timestamp: string): string {
  const timeSplitByParts = timestamp.split(" ");
  if (timeSplitByParts.length === 2) {
    const time = timeSplitByParts[1].split(".");
    if (time.length === 2) {
      return `${time[0]}.${time[1].substring(0, 3)}`
    }
  }
  return timestamp;
}

export function getConnectionByType(packet: PacketCaptureModel): string {
  if (packet.dnsHeader) {
    return "Name Lookup"
  }

  if (packet.tcpHeader) {
    const port = packet.tcpHeader.destinationPort;

    if (port === 80) return "Web Page";
    if (port === 443) return "Secure Web";
    if (port === 22) return "Remote Access";
    if (port === 21) return "File Transfer";
    if (port === 25 || port === 587) return "Email";
    if (port === 53) return "Name Lookup";
    if (port === 3389) return "Remote Desktop";

    if (port >= 0 && port <= 1023) return "System Service";
    if (port >= 1024 && port <= 49151) return "Application";
    return "Custom App";
  }

  if (packet.udpHeader) {
    const port = packet.udpHeader.destinationPort;

    if (port === 53) return "Name Lookup";
    if (port === 67 || port === 68) return "Network Setup";
    if (port === 123) return "Time Sync";

    return "Quick Message";
  }

  if (packet.icmpHeader) {
    return "Network Check";
  }

  return "Other";
}

export function getServiceByProtocolName(port: number): string {
  switch (port) {
    case 80:
      return "Web Browsing (80)";
    case 443:
      return "Secure Web (443)";
    case 22:
      return "Remote Access (22)";
    case 21:
      return "File Transfer (21)";
    case 25:
      return "Email (25)";
    case 53:
      return "Name Lookup (53)";
    case 123:
      return "Time Sync (123)";
    case 3389:
      return "Remote Desktop (3389)";
    case 8080:
      return "Web Alternative (8080)";
    default:
      if (port >= 0 && port <= 1023) {
        return `System Service (${port})`;
      } else if (port >= 1024 && port <= 49151) {
        return `Application (${port})`;
      } else {
        return `Custom App (${port})`;
      }
  }
}

export function getConnectionByStatus(flags: TCPFlags): string {
  if (flags.syn && !flags.ack) {
    return "Starting Connection";
  } else if (flags.syn && flags.ack) {
    return "Accepting Connection";
  } else if (flags.ack && !flags.fin && !flags.rst) {
    return "Active Connection";
  } else if (flags.fin) {
    return "Ending Connection";
  } else if (flags.rst) {
    return "Aborted Connection";
  } else {
    return "Regular Communication";
  }
}

export function getConnectionByItsPort(packet: PacketCaptureModel): string {
  if (packet.dnsHeader) {
    return "Looking up website addresses";
  }

  if (packet.tcpHeader) {
    const port = packet.tcpHeader.destinationPort;

    if (port === 80 || port === 443 || port === 8080) {
      return "Web browsing";
    } else if (port === 22 || port === 3389) {
      return "Remote access to another computer";
    } else if (port === 25 || port === 587 || port === 110 || port === 143) {
      return "Email communication";
    } else if (port === 53) {
      return "Looking up website addresses";
    } else if (port === 21 || port === 20) {
      return "Transferring files";
    } else {
      return "Application communication";
    }
  } else if (packet.udpHeader) {
    const port = packet.udpHeader.destinationPort;

    if (port === 53) {
      return "Looking up website addresses";
    } else if (port === 123) {
      return "Synchronizing computer clock";
    } else if (port === 67 || port === 68) {
      return "Setting up network connection";
    } else {
      return "Quick message between applications";
    }
  } else if (packet.icmpHeader) {
    return "Checking if another computer is reachable";
  } else {
    return "Unknown purpose";
  }
}

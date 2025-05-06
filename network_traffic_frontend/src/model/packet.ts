export type PacketCaptureModel = {
    timeStamp: string;
    ethernetHeader: EthernetHeader;
    ipv4Header: IPV4Header;
    tcpHeader: TCPHeader | null;
    udpHeader: UDPHeader | null;
    icmpHeader: ICMPHeader | null;
    dnsHeader: DNSHeader | null;
    hexStream: HEXStream | null;
}

export type EthernetHeader = {
    destinationAddress: string;
    sourceAddress: string;
    type: string;
}

export type IPV4Header = {
    version: number;
    internetHeaderLength: number;
    totalLength: number;
    identification: number;
    fragmentOffSet: number;
    timeToLive: number;
    protocol: number;
    headerCheckSum: string;
    sourceAddress: string;
    destinationAddress: string;
    flag: Flag;
    typeOfService: TypeOfService;
}

export type TCPHeader = {
    sourcePort: number;
    destinationPort: number;
    sequenceNumber: number;
    acknowledgmentNumber: number;
    dataOffset: number;
    reserved: number;
    window: number;
    checksum: string;
    urgentPointer: number;
    flags: TCPFlags;
}

export type TCPFlags = {
    ack: boolean;
    rst: boolean;
    syn: boolean;
    psh: boolean;
    fin: boolean;
    urg: boolean;
}

export type Flag = {
    reserved: boolean;
    dontFragment: boolean;
    moreFragments: boolean;
}

export type TypeOfService = {
    precedence: number;
    typeOfService: number;
    mustBeZero: number;
}

export type UDPHeader = {
    sourcePort: number;
    destinationPort: number;
    length: number;
    checkSum: string;
}

export type ICMPHeader = {
    type: number;
    code: number;
    checkSum: string;
}

export type DNSHeader = {
    transactionID: number;
    operationCode: string;
    responseCode: string;
    questionCount: number;
    answerRecordCount: number;
}

export type HEXStream = {
    length: number;
    hexStream: string | null;
}
export type CheckIPRepoter = {
  reportedAt: string;
  comment: string;
  categories: number[];
  reporterId: number;
  reporterCountryCode: string;
  reporterCountryName: string;
}

export type ReportersPagination = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  reports: CheckIPRepoter[];
}

export type CheckIPResponse = {
  ipAddress: string;
  ipVersion: number;
  abuseConfidenceScore: number;
  countryCode: string;
  countryName: string;
  usageType: string;
  isp: string;
  domain: string;
  hostnames: string[];
  totalReports: number;
  numDistinctUsers: number;
  lastReportedAt: string;
  public: boolean;
  tor: boolean;
  whitelisted: boolean;
  reports: ReportersPagination;
}

export type IPAddressInformation = {
  ipAddressData: {
    ipAddress: string;
    ipVersion: number;
    abuseConfidenceScore: number;
    countryCode: string;
    countryName: string;
    usageType: string;
    isp: string;
    domain: string;
    hostnames: string[];
    totalReports: number;
    numDistinctUsers: number;
    lastReportedAt: string;
    public: boolean;
    tor: boolean;
    whitelisted: boolean;
  }
}
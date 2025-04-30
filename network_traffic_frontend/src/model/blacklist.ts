export type BlacklistHeaderModel = {
    worldWideLast24Hours: number;
    worldWideLastMonth: number;
    irelandLast24Hours: number;
    irelandLast24HoursPercentage: number;
    irelandLastMonth: number;
    irelandLastMonthPercentage: number;
}

export type BlacklistModel = {
    id: number
    ipAddress: string
    countryCode: string
    abuseConfidenceScore: number
    lastReportedAt: Date | string
}

export type BlacklistPagingModel = {
    content: BlacklistModel[];
    number: number;
    totalElements: number;
    size: number;
}

export type PageableData = {
    data: BlacklistModel[];
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
    inPageChange: (page: number) => void;
}

export type BlacklistDataFilter = {
    countryCode?: string
    abuseScore?: string
    lastReportedDate?: Date
}
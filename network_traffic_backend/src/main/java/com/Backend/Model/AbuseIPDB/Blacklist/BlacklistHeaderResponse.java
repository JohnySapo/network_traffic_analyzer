package com.Backend.Model.AbuseIPDB.Blacklist;

/*
 ** Blacklist Header Response for Frontend
 ** to display simple data for ireland and globally
*/
public class BlacklistHeaderResponse {
    private Long worldWideLast24Hours;
    private Long worldWideLastMonth;
    private Long irelandLast24Hours;
    private Double irelandLast24HoursPercentage;
    private Long irelandLastMonth;
    private Double irelandLastMonthPercentage;

    public BlacklistHeaderResponse(
            Long worldWideLast24Hours,
            Long worldWideLastMonth,
            Long irelandLast24Hours,
            Double irelandLast24HoursPercentage,
            Long irelandLastMonth,
            Double irelandLastMonthPercentage
    ) {
        this.worldWideLast24Hours = worldWideLast24Hours;
        this.worldWideLastMonth = worldWideLastMonth;
        this.irelandLast24Hours = irelandLast24Hours;
        this.irelandLast24HoursPercentage = irelandLast24HoursPercentage;
        this.irelandLastMonth = irelandLastMonth;
        this.irelandLastMonthPercentage = irelandLastMonthPercentage;
    }

    public Long getWorldWideLast24Hours() {
        return worldWideLast24Hours;
    }

    public void setWorldWideLast24Hours(Long worldWideLast24Hours) {
        worldWideLast24Hours = worldWideLast24Hours;
    }

    public Long getWorldWideLastMonth() {
        return worldWideLastMonth;
    }

    public void setWorldWideLastMonth(Long worldWideLastMonth) {
        worldWideLastMonth = worldWideLastMonth;
    }

    public Long getIrelandLast24Hours() {
        return irelandLast24Hours;
    }

    public void setIrelandLast24Hours(Long irelandLast24Hours) {
        irelandLast24Hours = irelandLast24Hours;
    }

    public Long getIrelandLastMonth() {
        return irelandLastMonth;
    }

    public void setIrelandLastMonth(Long irelandLastMonth) {
        irelandLastMonth = irelandLastMonth;
    }

    public Double getIrelandLast24HoursPercentage() {
        return irelandLast24HoursPercentage;
    }

    public void setIrelandLast24HoursPercentage(Double irelandLast24HoursPercentage) {
        this.irelandLast24HoursPercentage = irelandLast24HoursPercentage;
    }

    public Double getIrelandLastMonthPercentage() {
        return irelandLastMonthPercentage;
    }

    public void setIrelandLastMonthPercentage(Double irelandLastMonthPercentage) {
        this.irelandLastMonthPercentage = irelandLastMonthPercentage;
    }
}

"use client"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { BlacklistDataFilter } from "@/model/blacklist";

const COUNTRY_CODE = [
  "US", "UK", "CA", "AU", "DE", "FR", "JP", "BR", "IN", "CN",
  "ES", "IT", "NL", "RU", "MX", "KR", "SG", "ZA", "SE", "CH",
]

const ABUSE_PERCENTAGES = [
  { value: "25", label: "Low (0-25%)" },
  { value: "50", label: "Medium (26-50%)" },
  { value: "75", label: "High (51-75%)" },
  { value: "100", label: "Critical (76-100%)" },
]

export const BlacklistFilter = ({ onFilter }: {
  onFilter: (filters: {
    countryCode?: string;
    abuseScore?: number;
    lastReportedDate?: string;
  }) => void;
}) => {

  const form = useForm<BlacklistDataFilter>({
    defaultValues: {
      countryCode: "",
      abuseScore: "",
      lastReportedDate: undefined,
    },
  });

  const handleSubmitField = (data: BlacklistDataFilter) => {
    onFilter({
      countryCode: data.countryCode,
      abuseScore: data.abuseScore ? Number.parseInt(data.abuseScore) : undefined,
      lastReportedDate: data.lastReportedDate ? format(data.lastReportedDate, "yyyy-MM-dd") : undefined,
    });
  };

  const handleResetField = () => {
    form.reset({
      countryCode: undefined,
      abuseScore: undefined,
      lastReportedDate: undefined,
    });
    onFilter({});
  };

  useEffect(() => {
    const subscription = form.watch((values) => {
      handleSubmitField(values);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="space-y-4 px-4 lg:px-6 ">
      <div className="rounded-2xl border shadow p-4 bg-card">
        <Form {...form}>
          <form className="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">

            {/* Country Code Component */}
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Country Code</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selectedValue = value === "all" ? "" : value;
                      form.setValue("countryCode", selectedValue, { shouldDirty: true, shouldValidate: true });
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value || "Select country"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="all" className="cursor-pointer">All Countries</SelectItem>
                      {COUNTRY_CODE.map((countryCode) => (
                        <SelectItem key={countryCode} value={countryCode} className="cursor-pointer">
                          {countryCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Abuse Meter Component */}
            <FormField
              control={form.control}
              name="abuseScore"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Abuse Score</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selectedValue = value === "any" ? undefined : value;
                      form.setValue("abuseScore", selectedValue, { shouldDirty: true, shouldValidate: true });
                    }}
                    value={form.watch("abuseScore")}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={field.value || "Select country"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>

                      <SelectItem value="any" className="cursor-pointer">Any Score</SelectItem>
                      {ABUSE_PERCENTAGES.map((abuseScore) => (
                        <SelectItem key={abuseScore.value} value={abuseScore.value} className="cursor-pointer">
                          {abuseScore.label}
                        </SelectItem>
                      ))}

                    </SelectContent>

                  </Select>
                </FormItem>
              )}
            />

            {/* Last Reported Date */}
            <FormField
              control={form.control}
              name="lastReportedDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Reported Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>

                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => form.setValue("lastReportedDate", date || undefined)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            {/* Reset Button */}
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleResetField} className="cursor-pointer">
                Reset
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
}

export default BlacklistFilter;
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardFooter
} from '@/components/ui/card';
import { BlacklistHeader } from '@/hooks/blacklist-hook';
import {
    Activity,
    Globe
} from 'lucide-react';

export const HeaderCards = () => {

    const { data } = BlacklistHeader();

    return (
        <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <Card className="@container/card shadow dark:shadow-neutral-100/30 shadow-neutral-950/50">
                <CardHeader className="relative">
                    <CardDescription>Last 24 Hours</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {data?.irelandLast24Hours}
                    </CardTitle>
                    <div className="absolute flex justify-center items-center right-4 top-4 px-3  rounded-lg  border-4">
                        <Globe className="size-3 me-1" />
                        {data?.irelandLast24HoursPercentage}%
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium justify-center items-center">
                        IP Addresses reported in Ireland <img src="https://flagcdn.com/w40/ie.png" width="30" height="20" alt="Ireland" />
                    </div>
                    <div className="text-muted-foreground">
                        Attention to any suspicious request
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card shadow dark:shadow-neutral-100/30 shadow-neutral-950/50">
                <CardHeader className="relative">
                    <CardDescription>Last Month</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {data?.irelandLastMonth}
                    </CardTitle>
                    <div className="absolute flex justify-center items-center right-4 top-4 px-3  rounded-lg  border-4">
                        <Globe className="size-3 me-1" />
                        {data?.irelandLastMonthPercentage}%
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium justify-center items-center">
                        IP Addresses reported in Ireland <img src="https://flagcdn.com/w40/ie.png" width="30" height="20" alt="Ireland" />
                    </div>
                    <div className="text-muted-foreground">
                        Attention to any suspicious request
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card shadow dark:shadow-neutral-100/30 shadow-neutral-950/50">
                <CardHeader className="relative">
                    <CardDescription>Last 24 Hours</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {data?.worldWideLast24Hours}
                    </CardTitle>
                    <div className="absolute flex justify-center items-center right-4 top-4 px-3  rounded-lg  border-4">
                        <Activity className="size-3" />
                        +12.5%
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium justify-center items-center">
                        IP Addresses reported WorldWide <Globe className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Engagement exceed targets</div>
                </CardFooter>
            </Card>
            <Card className="@container/card shadow dark:shadow-neutral-100/30 shadow-neutral-950/50">
                <CardHeader className="relative">
                    <CardDescription>Last Month</CardDescription>
                    <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                        {data?.worldWideLastMonth}
                    </CardTitle>
                    <div className="absolute flex justify-center items-center right-4 top-4 px-3  rounded-lg  border-4">
                        <Activity className="size-3" />
                        +12.5%
                    </div>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium justify-center items-center">
                        IP Addresses reported WorldWide <Globe className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Engagement exceed targets</div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default HeaderCards;
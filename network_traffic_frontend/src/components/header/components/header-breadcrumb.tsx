import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { PageTitle } from '@/lib/utils';

export const HeaderBreadcrumb = () => {
    const { mainPage, subPage } = PageTitle();

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbPage>
                        {subPage ? (
                            <BreadcrumbLink className="cursor-pointer" href={mainPage}>
                                {mainPage}
                            </BreadcrumbLink>
                        ) : (
                            <span className="">
                                {mainPage}
                            </span>
                        )}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                {subPage && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="font-medium">
                                {subPage}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default HeaderBreadcrumb;
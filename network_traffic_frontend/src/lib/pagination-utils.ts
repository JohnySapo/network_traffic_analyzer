/*  
** Calculate the total pages from
** values provided by the database
** using JS Math.ceil to round the value
** from the devision.
** Math => totalItems: Total Items (database value) / itemsPerPage: 12 pages (default)
*/
export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
    const total = Math.ceil(totalItems / itemsPerPage);
    return total;
}

/*
** Calculate the number of pages (default 5 pages)
** and validate if lastIndex (page) button is needed to display.
*/
export const validateAndDisplayTotalPages = (currentPage: number, totalItems: number, itemsPerPage: number): boolean => {
    const totalPages = getTotalPages(totalItems, itemsPerPage);

    if (totalPages > 5 && currentPage < totalPages - 2) {
        return true;
    }

    return false;
}

/**
** Functions gets the total number of pages
** with a for loop to minimum of 5 pages before tripple dot (...)
** and rearrange the values between 5 buttons
** each page number is pushed to the next button to fill in.
*/
export const getPageNumber = (currentPage: number, totalItems: number, itemsPerPage: number): number[] => {
    const pages: number[] = [];
    const totalPages = getTotalPages(totalItems, itemsPerPage);

    for (let i = 0; i < Math.min(5, totalPages); i++) {
        let pageNumber = currentPage;

        if (currentPage < 3) {
            pageNumber = i + 1;
        } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i;
        } else {
            pageNumber = currentPage - 2 + i;
        }

        if (pageNumber > 0 && pageNumber <= totalPages) {
            pages.push(pageNumber);
        }
    }

    return pages;
}
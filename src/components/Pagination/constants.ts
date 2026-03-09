export const PaginationQa = {
    PaginationPageSizer: 'pagination-page-sizer',
    PaginationPageSizerOption: 'pagination-page-sizer-option',
    PaginationInput: 'pagination-input',
    PaginationPage: 'pagination-page',
    PaginationButtonFirst: 'pagination-button-first',
    PaginationButtonPrevious: 'pagination-button-previous',
    PaginationButtonNext: 'pagination-button-next',
    PaginationButtonLast: 'pagination-button-last',
};

export const getPaginationPageQa = (pageNumber: number) => {
    return `${PaginationQa.PaginationPage}-${pageNumber}`;
};

export const getPaginationPageSizeOptionQa = (pageSizeOption: number) => {
    return `${PaginationQa.PaginationPageSizerOption}-${pageSizeOption}`;
};

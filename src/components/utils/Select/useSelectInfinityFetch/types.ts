export type PaginationResponse<Response, Pagination> = {
    response: Response;
    pagination?: Pagination | null;
};

export type Fetcher<Response, Pagination> = (
    pagination?: Pagination,
) => Promise<PaginationResponse<Response, Pagination>>;

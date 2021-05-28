import { APIRequestQueryParams } from "./APIRequestQueryParams"

export class PaginatedRequest extends APIRequestQueryParams {
    page: number = 0;
    pageSize: number = 20;
    constructor(page: number, pageSize: number) {
        super();
        this.page = page;
        this.pageSize = pageSize;
    }
}
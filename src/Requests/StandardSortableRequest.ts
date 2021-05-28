import { PaginatedRequest } from "./PaginatedRequest";

export type FHIRSortOrder = "ascending" | "descending" | null;

export class StandardSortableRequest extends PaginatedRequest {
    sortBy: string | null = null;
    sortOrder: FHIRSortOrder | null = null;
    set(value: FHIRSortOrder){
        this.sortOrder = value ?? null; //this is a trick that replaces undefined with null
    }
    public static createSimple(page: number, pageSize: number): StandardSortableRequest {
        let itm = new StandardSortableRequest(page,pageSize);
        return itm;
    }
    public static create(sortBy: string | null, sortOrder: FHIRSortOrder | null, page: number, pageSize: number) {
        let itm = new StandardSortableRequest(page,pageSize);
        
        itm.sortBy = sortBy;
        itm.sortOrder = sortOrder;
        return itm;
    }
}
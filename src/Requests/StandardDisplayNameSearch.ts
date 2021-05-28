import { FHIRSortOrder, StandardSortableRequest } from "./StandardSortableRequest";

export class StandardDisplayNameSearch extends StandardSortableRequest {
    displayName: string | null = null;
    roleCategoryFilter: string | null = null;
    locationFilter: string | null = null;

    static processOptions(options: any): StandardDisplayNameSearch {
        let start: number = 0;
        let pageSize: number = 0;
        if ('pagination' in options) {
            start = (options.pagination.current - 1);
            pageSize = options.pagination.pageSize;
        }
        const search = new StandardDisplayNameSearch(start,pageSize);
        let order: FHIRSortOrder = 'ascending';
        if ('sortField' in options && 'sortOrder' in options) {
            order = options.sortOrder === "ascend" ? 'ascending' : 'descending';
            const sortField: string = options.sortField;
            if (sortField === 'SignInDateTime') {
                search.sortBy = "lastroleselected";
            } else {
                search.sortBy = sortField;
            }
            
            search.sortOrder = order;
        } else {
            search.sortBy = "displayname";
            search.sortOrder = "ascending";
        }
        if ('filter' in options) {
            let filterDetails = options.filter;
            if ('name' in filterDetails && (filterDetails as any)['name'] !== undefined) {
                search.displayName = ((filterDetails as any)['name'] as string);
            }
        }
        return search;
    }
}
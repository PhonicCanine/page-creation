import { FHIRPractitionerRole } from "../Model/FHIRPractitionerRole";
import { StandardSortableRequest } from "../Requests/StandardSortableRequest";
import { RequestHelpers } from "../Requests/RequestHelpers";
import { StandardDisplayNameSearch } from "../Requests/StandardDisplayNameSearch";
import { FHIRPractitioner } from "../Model/FHIRPractitioner";
import { FHIRDirectoryResponse } from "../Model/FHIRDirectoryResponse";
import { FHIRLocation } from "../Model/FHIRLocation";
import { FHIRRoleCategory } from "../Model/FHIRRoleCategory";
import FHIRPaginatedList from "../Model/FHIRPaginatedList";
import { API_URL, PAGE_SIZE } from "../Config/config";

export class APIConnection {
    static get baseUrl(): string {
        return API_URL;
    }

    static async getPractitionerRole(id: string): Promise<FHIRPractitionerRole | null> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/PractitionerRole/${id}`);
        const response = await x.json();
        const itm = await response as FHIRDirectoryResponse<FHIRPractitionerRole>;
        return itm.entry;
    }
    static async getPractitionerRoles(request: StandardSortableRequest): Promise<FHIRPaginatedList<FHIRPractitionerRole>> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/PractitionerRole${RequestHelpers.FlattenRequest(request)}`);
        console.log(x.url);
        const response = await x.json();
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRPractitionerRole>();
        ret.count = count;
        ret.results = response as FHIRPractitionerRole[];
        return ret;
    }
    static async getPractitionerRolesSearch(request: StandardDisplayNameSearch): Promise<FHIRPaginatedList<FHIRPractitionerRole>> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/PractitionerRole/search${RequestHelpers.FlattenRequest(request)}`);
        console.log(x.url);
        const response = await x.json();
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRPractitionerRole>();
        ret.count = count;
        ret.results = response as FHIRPractitionerRole[];
        return ret;
    }
    static async getPractitionerRolesQuery(query: string | undefined, page: number): Promise<FHIRPaginatedList<FHIRPractitionerRole>> {
        if (query === undefined || query === "") {
            return await APIConnection.getPractitionerRoles(new StandardSortableRequest(page,PAGE_SIZE));
        }
        const options = new StandardDisplayNameSearch(page,PAGE_SIZE);
        options.displayName = query;
        return await APIConnection.getPractitionerRolesSearch(options);
    }

    static async getPractitioner(id: string): Promise<FHIRPractitioner | null> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/Practitioner/${id}`);
        const response = x.json();
        const itm = await response as FHIRDirectoryResponse<FHIRPractitioner>;
        return itm.entry;
    }
    static async getPractitioners(request: StandardSortableRequest): Promise<FHIRPaginatedList<FHIRPractitioner>> {
        const url = `${this.baseUrl}pegacorn/operations/directory/r1/Practitioner${RequestHelpers.FlattenRequest(request)}`;
        const x = await fetch(url);
        
        const response = await x.json();
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRPractitioner>();
        ret.count = count;
        ret.results = response as FHIRPractitioner[];
        return ret;
    }
    static async getPractitionersSearch(request: StandardDisplayNameSearch): Promise<FHIRPaginatedList<FHIRPractitioner>> {
        if (request.displayName === "" || request.displayName === null) {
            return this.getPractitioners(request);
        }
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/Practitioner/search${RequestHelpers.FlattenRequest(request)}`);
        
        const response = await x.json();
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRPractitioner>();
        ret.count = count;
        ret.results = response as FHIRPractitioner[];
        return ret;
    }
    static async getPractitionersQuery(query: string | undefined, page: number): Promise<FHIRPaginatedList<FHIRPractitioner>> {
        if (query === undefined || query === "") {
            return await APIConnection.getPractitioners(new StandardSortableRequest(page,PAGE_SIZE));
        }
        const options = new StandardDisplayNameSearch(page,PAGE_SIZE);
        options.displayName = query;
        return await APIConnection.getPractitionersSearch(options);
    }

    static async getLocations(request: StandardSortableRequest): Promise<FHIRPaginatedList<FHIRLocation>> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/Location${RequestHelpers.FlattenRequest(request)}`);
        const response = await x.json();
        
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRLocation>();
        ret.count = count;
        ret.results = response as FHIRLocation[];
        return ret;
    }
    static async getLocationsSearch(request: StandardDisplayNameSearch): Promise<FHIRPaginatedList<FHIRLocation>> {
        if (request.displayName === "" || request.displayName === null) {
            return this.getLocations(request);
        }

        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/Location/search${RequestHelpers.FlattenRequest(request)}`);
        const response = await x.json();
        
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRLocation>();
        ret.count = count;
        ret.results = response as FHIRLocation[];
        return ret;
    }

    static async getRoleCategories(request: StandardSortableRequest): Promise<FHIRPaginatedList<FHIRRoleCategory>> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/RoleCategory${RequestHelpers.FlattenRequest(request)}`);
        const response = await x.json();
        
        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRRoleCategory>();
        ret.count = count;
        ret.results = response as FHIRRoleCategory[];
        return ret;
    }

    static async getRoleCategoriesSearch(request: StandardDisplayNameSearch): Promise<FHIRPaginatedList<FHIRRoleCategory>> {
        const x = await fetch(`${this.baseUrl}pegacorn/operations/directory/r1/RoleCategory/search${RequestHelpers.FlattenRequest(request)}`);
        const response = await x.json();

        const count = Number(x.headers.get('X-Total-Count'));
        const ret = new FHIRPaginatedList<FHIRRoleCategory>();
        ret.count = count;
        ret.results = response as FHIRRoleCategory[];
        return ret;
    }
}
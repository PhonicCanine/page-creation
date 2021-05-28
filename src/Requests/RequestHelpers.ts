import { APIRequestQueryParams } from "./APIRequestQueryParams";

export class RequestHelpers {
    public static FlattenRequest(queryParams: APIRequestQueryParams | null): string {
        return this.FlattenRequestInner(queryParams).replace("&","?");
    }
    private static FlattenRequestInner(queryParams: APIRequestQueryParams | null): string {
        if (queryParams === null) return "";
        let returnValue = "";
        for (let i in queryParams) {
            if (queryParams.hasOwnProperty(i)){
                let j = (queryParams as any)[i];
                if (j instanceof APIRequestQueryParams) {
                    returnValue += this.FlattenRequestInner(j);
                } else if (j !== null && (typeof j === 'number' || typeof j === 'string' || typeof j === 'bigint')) {
                    returnValue += `&${i}=${j}`;
                }
            }
        }
        returnValue = `${returnValue}`;
        return returnValue;
    }
}
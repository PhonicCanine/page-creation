export class FHIRDirectoryResponse<T>{
    id : string = "";
    created: boolean = false;
    entry: T | null = null;
}
export default class FHIRPaginatedList<T> {
    count: number = 0;
    results: T[] = [];
}
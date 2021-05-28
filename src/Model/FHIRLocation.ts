import FHIRIdentifier from "./FHIRIdentifier";

export class FHIRLocation{
    simplifiedID: string = "";
    identifiers: FHIRIdentifier[] = [];
    displayName: string = "";
    description: string | null = null;
    containedLocationIDs: string[] = [];
    containingLocationID: string|null = null;
}
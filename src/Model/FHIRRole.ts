import FHIRIdentifier from "./FHIRIdentifier";

export class FHIRRole {
    simplifiedID: string = "";
    identifiers: FHIRIdentifier[] = [];
    displayName: string = "";
    description: string | null = null;
}
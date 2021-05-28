import FHIRIdentifier from "./FHIRIdentifier"

export class FHIRRoleCategory{
    simplifiedId: string = "";
    identifiers: FHIRIdentifier[] = [];
    description: string | null = null;
    displayName: string = "";
    roles: string[] = [];
}
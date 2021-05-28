import { FHIRContactPoint } from "./FHIRContactPoint";
import FHIRIdentifier from "./FHIRIdentifier";
import { FHIRRoleHistory } from "./FHIRRoleHistory";

export class FHIRPractitionerRole {
    identifiers: FHIRIdentifier[] = [];
    displayName: string = "";
    description: string | null = null;
    systemManaged: boolean = false;
    primaryOrganizationID: string = "";
    primaryLocationID: string = "";
    primaryRoleID: string = "";
    contactPoints: FHIRContactPoint[] = [];
    primaryRoleCategoryID: string = "";
    roleHistory: FHIRRoleHistory | null = null;
    activePractitionerSet: string[] = [];
}
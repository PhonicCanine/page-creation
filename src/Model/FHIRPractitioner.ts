import { FHIRContactPoint } from "./FHIRContactPoint";
import FHIRIdentifier from "./FHIRIdentifier";
import { FHIRName } from "./FHIRName";
import { FHIRRoleHistory } from "./FHIRRoleHistory";
import { FHIRStatus } from "./FHIRStatus";

export class FHIRPractitioner{
    simplifiedID: string = "";
    identifiers: FHIRIdentifier[] = [];
    displayName: string = "";
    systemManaged: boolean = false;
    officialName: FHIRName = new FHIRName();
    otherNames: FHIRName[] = [];
    contactPoints: FHIRContactPoint[] = [];
    currentPractitionerRoles: string[] = [];
    practitionerRoleHistories: FHIRRoleHistory | null = null;
    practitionerStatus: FHIRStatus | null = null;
    dateTimeLastRoleSelected: string | null = null;
}
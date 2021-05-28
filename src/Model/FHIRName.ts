import { FHIRTimePeriod } from "./FHIRTimePeriod"

export class FHIRName {
    nameUse: string = "";
    displayName: string ="";
    familyName: string ="";
    givenNames: string[] = [];
    preferredGivenName: string = "";
    prefixes: string[] = [];
    suffixes: string[] = [];
    period: FHIRTimePeriod = new FHIRTimePeriod();
}
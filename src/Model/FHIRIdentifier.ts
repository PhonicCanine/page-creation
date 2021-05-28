export default class FHIRIdentifier {
    type: string = "";
    use: string = "";
    value: string = "";
    leafValue: string = "";
    constructor(type:string, use:string, value:string, leafValue:string) {
        this.type = type;
        this.use = use;
        this.value = value;
        this.leafValue = leafValue;
    }
}
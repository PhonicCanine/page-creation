export default class Patient {
    URN: string;
    DOB: string;
    Name: string;
    constructor(URN: string, DOB: string, Name: string) {
        this.URN = URN;
        this.DOB = DOB;
        this.Name = Name;
    }
}
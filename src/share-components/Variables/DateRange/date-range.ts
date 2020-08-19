export class ODateRange{
    constructor(obj?: any){
        this.startDate = obj ? obj.startDate : null;
        this.endDate = obj ? obj.endDate : null;
    }
    startDate?: Date;
    endDate?: Date;
}
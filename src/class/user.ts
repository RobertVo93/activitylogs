export class User {
    constructor(obj?: any){
        this._id        = (obj && obj._id)?         obj._id : null;
        this.userId     = (obj && obj.userId)?      obj.userId : '';
        this.email      = (obj && obj.email)?       obj.email : '';
        this.password   = (obj && obj.password)?    obj.password : '';
        this.firstName  = (obj && obj.firstName)?   obj.firstName : '';
        this.lastName   = (obj && obj.lastName)?    obj.lastName : '';
        this.phone      = (obj && obj.phone)?       obj.phone : '';
        this.address    = (obj && obj.address)?     obj.address : '';
        this.token      = (obj && obj.token)?       obj.token : '';
    }
    _id: any;
    userId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    token: string
}
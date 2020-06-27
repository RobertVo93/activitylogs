//make consistent with language.ts in frontend
export class ResponseData {
    constructor(obj?:any) {
        this.success = (obj != null && obj.success != null) ? obj.success : false;
        this.message = (obj != null && obj.message != null) ? obj.message : '';
        this.returnObj = (obj != null && obj.returnObj != null) ? obj.returnObj : '';
        this.status = (obj != null && obj.status != null) ? obj.status : '';
    }
    success: boolean;
    message: string;
    returnObj: any;
    status: number;
}

//make consistent with language.ts in frontend
export class JwtResponse {
    constructor(obj?:any) {
        this._id = (obj != null && obj._id != null) ? obj._id : null;
        this.name = (obj != null && obj.name != null) ? obj.name : '';
        this.email = (obj != null && obj.email != null) ? obj.email : '';
        this.access_token = (obj != null && obj.access_token != null) ? obj.access_token : '';
        this.expires_in = (obj != null && obj.expires_in != null) ? obj.expires_in : '';
    }
    _id: any;
    name: string;
    email: string;
    access_token: string;
    expires_in: number;
}
import { User } from "./user";
import { Comment } from "./common/comment";
export class Project {
    constructor(obj?:any){
        this._id = obj ? obj._id : null;
        this.name = obj ? obj.name : '';
        this.manager = obj ? obj.manager : new User();
        this.members = obj ? obj.members : [];
        this.comments = obj ? obj.comment : [];

        this.createdBy =  obj ? obj.createdBy : new User();
        this.createdDate =  obj ? obj.createdDate: new Date();
        this.updatedBy =  obj ? obj.updatedBy : new User();
        this.updatedDate =  obj ? obj.updatedDate : new Date();
    }
    _id:any;
    name: string;
    manager: User;
    members: any[];
    comments: Comment[];

    createdBy: User;
    createdDate: Date;
    updatedBy: User;
    updatedDate: Date;
}
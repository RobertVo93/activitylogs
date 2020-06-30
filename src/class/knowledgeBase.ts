import { User } from "./user";
import { Comment } from "./common/comment";
export class KnowledgeBase {
    constructor(obj?:any){
        this._id = obj ? obj._id : null;
        this.name = obj ? obj.name : '';
        this.owner = obj ? obj.owner : new User();
        this.comments = obj ? obj.comment : [];

        this.createdBy =  obj ? obj.createdBy : new User();
        this.createdDate =  obj ? obj.createdDate: new Date();
        this.updatedBy =  obj ? obj.updatedBy : new User();
        this.updatedDate =  obj ? obj.updatedDate : new Date();
    }
    _id:any;
    name: string;
    owner: User;
    comments: Comment[];

    createdBy: User;
    createdDate: Date;
    updatedBy: User;
    updatedDate: Date;
}
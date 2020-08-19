import { ODateRange } from "../share-components/Variables/DateRange";
import { KeyValue } from "./common/keyValue";
import { User } from "./user";
import { Comment } from "../share-components/CommentLog";
import { Project } from "./project";

export class Activity {
    constructor(obj?:any){
        this._id = obj ? obj._id : null;
        this.description = obj ? obj.description : '';
        this.implemetationPlan = obj ? obj.implemetationPlan : '';
        this.project = obj ? obj.project : new Project();
        this.planDate = obj ? obj.planDate : new ODateRange();
        this.actualDate = obj ? obj.actualDate : new ODateRange();
        this.status = obj ? obj.status : new KeyValue();
        this.assignedTo = obj ? obj.assignedTo : new User();
        this.comments = obj ? obj.comment : [];

        this.createdBy =  obj ? obj.createdBy : new User();
        this.createdDate =  obj ? obj.createdDate: new Date();
        this.updatedBy =  obj ? obj.updatedBy : new User();
        this.updatedDate =  obj ? obj.updatedDate : new Date();
    }
    _id:any;
    description: string;
    implemetationPlan: string;
    project: Project;
    planDate: ODateRange;
    actualDate: ODateRange;
    status: KeyValue;
    assignedTo: User;
    comments: Comment[];

    createdBy: User;
    createdDate: Date;
    updatedBy: User;
    updatedDate: Date;
}
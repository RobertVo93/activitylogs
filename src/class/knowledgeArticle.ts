import { User } from "./user";
import { KnowledgeBase } from "./knowledgeBase";
export class KnowledgeArticle {
    constructor(obj?:any){
        this._id = obj ? obj._id : null;
        this.shortDescription = obj ? obj.shortDescription : '';
        this.knowledgeBase = obj ? obj.knowledgeBase : new KnowledgeBase();
        this.contents = obj ? obj.contents : '';
        this.reviewer = obj ? obj.reviewer : new User();
        this.version = obj ? obj.version : 0;

        this.createdBy =  obj ? obj.createdBy : new User();
        this.createdDate =  obj ? obj.createdDate: new Date();
        this.updatedBy =  obj ? obj.updatedBy : new User();
        this.updatedDate =  obj ? obj.updatedDate : new Date();
    }
    _id:any;
    shortDescription: string;
    knowledgeBase: KnowledgeBase;
    contents: string;
    reviewer: User;
    version: number;

    createdBy: User;
    createdDate: Date;
    updatedBy: User;
    updatedDate: Date;
}
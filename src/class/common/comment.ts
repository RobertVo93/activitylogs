import { User } from "../user";

export class Comment {
    constructor(obj?: any){
        this.target = obj ? obj.target : null;
        this.comment = obj ? obj.comment : null;
        this.userComment = obj ? obj.userComment : null;
        this.commentDate = obj ? obj.commentDate : null;
    }
    target: string; //target Object's _id
    comment: string;
    userComment: User;
    commentDate: string;
}
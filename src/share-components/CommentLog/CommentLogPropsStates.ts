import { Comment } from "../../class/common/comment";
import { User } from "../../class/user";

export interface CommentProps {
    comments: Comment[],
    onSubmitComment: (form: CommentStates) => void,
    loginUser: User
}
export interface CommentStates {
    comments: Comment[],
    newComment: string
}
export const initialCommentStates: CommentStates = {
    comments: [],
    newComment: ''
}
import { Comment } from "./comment";

export interface CommentProps {
    comments: Comment[],
    commentedUser: any,
    onSubmitComment: (form: CommentStates) => void
}
export interface CommentStates {
    comments: Comment[],
    newComment: string
}
export const initialCommentStates: CommentStates = {
    comments: [],
    newComment: ''
}
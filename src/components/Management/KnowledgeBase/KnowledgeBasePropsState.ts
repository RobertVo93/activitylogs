import { RouteComponentProps } from "react-router-dom";
import { KnowledgeBase } from "../../../class/knowledgeBase";
import { User } from "../../../class/user";
export interface KnowledgeBaseProps extends RouteComponentProps<any>{
    loginUser: User
}

export interface KnowledgeBaseStates {
    errors:{[s:string]: string[]},
    knowledgeBase: KnowledgeBase,
    isEditRecord: boolean   //to check this page is edit or create new
}

export const initialKnowledgeBaseStates: KnowledgeBaseStates = {
    errors: {},
    knowledgeBase: new KnowledgeBase(),
    isEditRecord: false
}
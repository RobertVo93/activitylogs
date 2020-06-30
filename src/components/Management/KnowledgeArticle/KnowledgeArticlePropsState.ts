import { RouteComponentProps } from "react-router-dom";
import { KnowledgeArticle } from "../../../class/knowledgeArticle";
import { User } from "../../../class/user";
export interface KnowledgeArticleProps extends RouteComponentProps<any>{
    loginUser: User
}

export interface KnowledgeArticleStates {
    errors:{[s:string]: string[]},
    knowledgeArticle: KnowledgeArticle,
    isEditRecord: boolean   //to check this page is edit or create new
}

export const initialKnowledgeArticleStates: KnowledgeArticleStates = {
    errors: {},
    knowledgeArticle: new KnowledgeArticle(),
    isEditRecord: false
}
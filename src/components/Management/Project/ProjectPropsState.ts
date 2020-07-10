import { RouteComponentProps } from "react-router-dom";
import { Project } from "../../../class/project";
import { User } from "../../../class/user";
export interface ProjectProps extends RouteComponentProps<any>{
    loginUser: User
}

export interface ProjectStates {
    errors:{[s:string]: string[]},
    project: Project,
    isEditRecord: boolean   //to check this page is edit or create new
}

export const initialProjectStates: ProjectStates = {
    errors: {},
    project: new Project(),
    isEditRecord: false
}
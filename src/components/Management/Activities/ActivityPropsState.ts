import { RouteComponentProps } from "react-router-dom";
import { Activity } from "../../../class/activity";
import { User } from "../../../class/user";
export interface ActivityProps extends RouteComponentProps<any>{
    loginUser: User
}

export interface ActivityStates {
    errors:{[s:string]: string[]},
    activity: Activity,
    isEditRecord: boolean   //to check this page is edit or create new
}

export const initialActivityStates: ActivityStates = {
    errors: {},
    activity: new Activity(),
    isEditRecord: false
}
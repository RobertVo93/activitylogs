import { User } from "../../../class/user";
import { RouteComponentProps } from "react-router-dom";

export interface UserProps extends RouteComponentProps<any>{

}

export interface UserStates {
    user: User;
}

export const initialUserState : UserStates = {
    user: new User()
}
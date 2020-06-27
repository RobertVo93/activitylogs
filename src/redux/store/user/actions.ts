import { USER_LOGOUT, USER_LOGIN, STORE_USER } from "./types";
import { User } from "../../../class/user";

export function storeUser(users: User[]){
  return {
    type: STORE_USER,
    payload: users
  };
}

export function loginUser(loginUser: User) {
  return {
    type: USER_LOGIN,
    payload: loginUser
  };
}

export function logoutUser() {
  return {
    type: USER_LOGOUT,
    meta: {}
  };
}

import {
  USER_LOGIN,
  USER_LOGOUT,
  UserActionTypes,
  STORE_USER
} from "./types";

const initialState = {
  currentUser: {},
  userList: []
}

export function userReducer(
  state = initialState,
  action: UserActionTypes
): any {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state, currentUser: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state, currentUser: {}
      };
    case STORE_USER:
      return {
        ...state, userList: action.payload
      }
    default:
      return state;
  }
}

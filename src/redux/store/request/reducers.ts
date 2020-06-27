import {
  UPDATE_REQUEST,
  RequestActionTypes
} from "./types";

const initialState = {
  numberOfRequest: 0
}

export function requestReducer(
  state = initialState,
  action: RequestActionTypes
): any {
  switch (action.type) {
    case UPDATE_REQUEST:
      return {
        ...state, numberOfRequest: action.payload
      };
    default:
      return state;
  }
}

import {
  STORE_ACTIVITIES,
  REMOVE_ACTIVITIES,
  ActivityActionTypes
} from "./types";

const initialState = {
  activities: []
}

export function activityReducer(
  state = initialState,
  action: ActivityActionTypes
): any {
  switch (action.type) {
    case STORE_ACTIVITIES:
      return {
        ...state, activities: action.payload
      };
    case REMOVE_ACTIVITIES:
      return {
        ...state, activities: []
      };
    default:
      return state;
  }
}

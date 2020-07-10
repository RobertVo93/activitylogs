import {
  STORE_PROJECTS,
  REMOVE_PROJECTS,
  ProjectActionTypes
} from "./types";

const initialState = {
  projects: []
}

export function projectReducer(
  state = initialState,
  action: ProjectActionTypes
): any {
  switch (action.type) {
    case STORE_PROJECTS:
      return {
        ...state, projects: action.payload
      };
    case REMOVE_PROJECTS:
      return {
        ...state, projects: []
      };
    default:
      return state;
  }
}

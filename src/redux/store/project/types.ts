import { Project } from "../../../class/project";

// Describing the different ACTION NAMES available
export const STORE_PROJECTS = "STORE_PROJECTS";
export const REMOVE_PROJECTS = "REMOVE_PROJECTS";

interface StoreProjectsAction {
  type: typeof STORE_PROJECTS;
  payload: Project[];
}

interface RemoveProjectsAction {
  type: typeof REMOVE_PROJECTS;
  meta: {
    timestamp: number;
  };
}

export type ProjectActionTypes = StoreProjectsAction | RemoveProjectsAction;

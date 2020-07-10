import { REMOVE_PROJECTS, STORE_PROJECTS } from "./types";
import { Project } from "../../../class/project";

export function storeProjects(acts: Project[]) {
  return {
    type: STORE_PROJECTS,
    payload: acts
  };
}

export function removeProjects(timestamp: number) {
  return {
    type: REMOVE_PROJECTS,
    meta: {
      timestamp
    }
  };
}

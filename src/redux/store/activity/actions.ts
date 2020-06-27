import { REMOVE_ACTIVITIES, STORE_ACTIVITIES } from "./types";
import { Activity } from "../../../class/activity";

export function storeActivities(acts: Activity[]) {
  return {
    type: STORE_ACTIVITIES,
    payload: acts
  };
}

export function removeActivities(timestamp: number) {
  return {
    type: REMOVE_ACTIVITIES,
    meta: {
      timestamp
    }
  };
}

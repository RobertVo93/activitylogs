import { Activity } from "../../../class/activity";

// Describing the different ACTION NAMES available
export const STORE_ACTIVITIES = "STORE_ACTIVITIES";
export const REMOVE_ACTIVITIES = "REMOVE_ACTIVITIES";

interface StoreActivitiesAction {
  type: typeof STORE_ACTIVITIES;
  payload: Activity[];
}

interface RemoveActivitiesAction {
  type: typeof REMOVE_ACTIVITIES;
  meta: {
    timestamp: number;
  };
}

export type ActivityActionTypes = StoreActivitiesAction | RemoveActivitiesAction;

export const UPDATE_REQUEST = "UPDATE_REQUEST";

export interface UpdateRequestsAction {
  type: typeof UPDATE_REQUEST;
  payload: number;
}

export type RequestActionTypes = UpdateRequestsAction;

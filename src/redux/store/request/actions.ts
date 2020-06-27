import { UpdateRequestsAction, UPDATE_REQUEST } from "./types";

export function updateRequest(noRequests: number): UpdateRequestsAction{
  return {
    type: UPDATE_REQUEST,
    payload: noRequests
  };
}

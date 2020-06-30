import {
  STORE_KNOWLEDGE_BASES,
  REMOVE_KNOWLEDGE_BASES,
  KnowledgeBaseActionTypes
} from "./types";

const initialState = {
  knowledgeBases: []
}

export function knowledgeBaseReducer(
  state = initialState,
  action: KnowledgeBaseActionTypes
): any {
  switch (action.type) {
    case STORE_KNOWLEDGE_BASES:
      return {
        ...state, knowledgeBases: action.payload
      };
    case REMOVE_KNOWLEDGE_BASES:
      return {
        ...state, knowledgeBases: []
      };
    default:
      return state;
  }
}

import {
  STORE_KNOWLEDGE_ARTICLES,
  REMOVE_KNOWLEDGE_ARTICLES,
  KnowledgeArticleActionTypes
} from "./types";

const initialState = {
  knowledgeArticles: []
}

export function knowledgeArticleReducer(
  state = initialState,
  action: KnowledgeArticleActionTypes
): any {
  switch (action.type) {
    case STORE_KNOWLEDGE_ARTICLES:
      return {
        ...state, knowledgeArticles: action.payload
      };
    case REMOVE_KNOWLEDGE_ARTICLES:
      return {
        ...state, knowledgeArticles: []
      };
    default:
      return state;
  }
}

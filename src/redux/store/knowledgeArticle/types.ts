import { KnowledgeArticle } from "../../../class/knowledgeArticle";

// Describing the different ACTION NAMES available
export const STORE_KNOWLEDGE_ARTICLES = "STORE_KNOWLEDGE_ARTICLES";
export const REMOVE_KNOWLEDGE_ARTICLES = "REMOVE_KNOWLEDGE_ARTICLES";

interface StoreKnowledgeArticlesAction {
  type: typeof STORE_KNOWLEDGE_ARTICLES;
  payload: KnowledgeArticle[];
}

interface RemoveKnowledgeArticlesAction {
  type: typeof REMOVE_KNOWLEDGE_ARTICLES;
  meta: {
    timestamp: number;
  };
}

export type KnowledgeArticleActionTypes = StoreKnowledgeArticlesAction | RemoveKnowledgeArticlesAction;

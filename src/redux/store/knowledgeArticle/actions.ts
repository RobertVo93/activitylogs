import { REMOVE_KNOWLEDGE_ARTICLES, STORE_KNOWLEDGE_ARTICLES } from "./types";
import { KnowledgeArticle } from "../../../class/knowledgeArticle";

export function storeKnowledgeArticles(acts: KnowledgeArticle[]) {
  return {
    type: STORE_KNOWLEDGE_ARTICLES,
    payload: acts
  };
}

export function removeKnowledgeArticles(timestamp: number) {
  return {
    type: REMOVE_KNOWLEDGE_ARTICLES,
    meta: {
      timestamp
    }
  };
}

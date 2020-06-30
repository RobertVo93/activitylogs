import { REMOVE_KNOWLEDGE_BASES, STORE_KNOWLEDGE_BASES } from "./types";
import { KnowledgeBase } from "../../../class/knowledgeBase";

export function storeKnowledgeBases(acts: KnowledgeBase[]) {
  return {
    type: STORE_KNOWLEDGE_BASES,
    payload: acts
  };
}

export function removeKnowledgeBases(timestamp: number) {
  return {
    type: REMOVE_KNOWLEDGE_BASES,
    meta: {
      timestamp
    }
  };
}

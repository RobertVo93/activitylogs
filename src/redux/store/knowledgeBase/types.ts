import { KnowledgeBase } from "../../../class/knowledgeBase";

// Describing the different ACTION NAMES available
export const STORE_KNOWLEDGE_BASES = "STORE_KNOWLEDGE_BASES";
export const REMOVE_KNOWLEDGE_BASES = "REMOVE_KNOWLEDGE_BASES";

interface StoreKnowledgeBasesAction {
  type: typeof STORE_KNOWLEDGE_BASES;
  payload: KnowledgeBase[];
}

interface RemoveKnowledgeBasesAction {
  type: typeof REMOVE_KNOWLEDGE_BASES;
  meta: {
    timestamp: number;
  };
}

export type KnowledgeBaseActionTypes = StoreKnowledgeBasesAction | RemoveKnowledgeBasesAction;

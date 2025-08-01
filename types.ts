
export enum PlacementRule {
  PREFIX = 'PREFIX',
  MIDDLE = 'MIDDLE',
  SUFFIX_PARAM = 'SUFFIX_PARAM',
  SUFFIX_REPLACEABLE_PARAM = 'SUFFIX_REPLACEABLE_PARAM',
  WRAP_SELECTION = 'WRAP_SELECTION',
  INSERT_AT_CURSOR = 'INSERT_AT_CURSOR',
  REPLACE_ALL = 'REPLACE_ALL',
}

export interface PromptComponent {
  id: string;
  text: string;
  category: string;
  description: string;
  placement: PlacementRule;
  param?: string; // e.g., '--ar' for aspect ratio to identify for replacement
  accepts_value?: boolean;
}

export enum LinterMessageType {
    Warning = 'Warning',
    Suggestion = 'Suggestion',
    Error = 'Error'
}

export interface LinterMessage {
    type: LinterMessageType;
    message: string;
    startIndex?: number;
    endIndex?: number;
}

export type HistoryItem = {
    id: string;
    prompt: string;
    timestamp: number;
}


export interface CustomSet {
  id: string;
  name: string;
  prompt: string;
}

// Enhanced data structure for themed components
export interface ThemedComponent extends PromptComponent {
  role: string;
  themes: string[];
}

export interface ThemedDatabase {
  [role: string]: ThemedComponent[];
}

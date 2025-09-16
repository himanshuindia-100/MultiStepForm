// src/types.ts
export type QuestionType = "text" | "radio" | "checkbox";

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Option[]; // for radio & checkbox
}

export interface Screen {
  id: string;
  title?: string;
  questions: Question[];
}

export interface Chapter {
  id: string;
  title?: string;
  screens: Screen[];
}

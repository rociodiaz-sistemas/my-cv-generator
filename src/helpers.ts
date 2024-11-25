import { CVFormData } from "./store/types";
import { v4 as uuidv4 } from "uuid";

export const getAlphabetLabel = (index: number) =>
  String.fromCharCode(65 + index); // 65 is "A" in ASCII

export const transformToArray = (value: string): string[] => {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter((item) => item); // Trim and filter empty strings
};

export const arraysEqual = (a: string[], b: string[]) => {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
};

export const createCV = (cvData: CVFormData) => {
  return {
    ...cvData,
    id: uuidv4(),
    date: new Date().toLocaleDateString(),
    cvPDFName: `${cvData.title.replace(/\s+/g, "-")}`, // Replace spaces with dashes
  };
};

export const YEARS_OF_EXPERIENCE = 6;

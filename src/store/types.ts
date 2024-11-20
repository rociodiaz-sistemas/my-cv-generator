export interface CV {
  id: string;
  title: string;
  jobTitle: string;
  introduction: string;
  date: string;
  skills: string[];
  experiences: Experience[];
  cvPDFName: string;
}

export interface Experience {
  id: number;
  label: string;
  title: string;
  company: string;
  project?: string;
  prompt: string;
  bulletPoints?: string[];
  projectName?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface StepConfig {
  component: React.ComponentType<any>;
  prompt?: string;
  props?: {
    field?: string;
    rows?: number;
    multiline?: boolean;
    id: string;
    label: string;
    isFormField: boolean;
  };
}

export interface Profile {
  profileExperiences: Experience[];
  skills: string[];
  jobTitle: string;
}

export interface KeyAttributes {
  technicalSkills: string[];
  concepts: string[];
  interpersonalSkills: string[];
}

export interface ExperiencesSuggestions {
  id: Experience["id"];
  reason: string;
}

export type PreviewCV = Omit<CV, "id" | "cvPDFName" | "date" | "title">;

export type CVFormData = Omit<CV, "id" | "cvPDFName" | "date">;

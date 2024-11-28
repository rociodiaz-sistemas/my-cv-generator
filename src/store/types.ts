export interface CV {
  id: string;
  title: string;
  jobTitle: string;
  introduction: string;
  date: string;
  skills: Skills;
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
  hireType?: string;
  location?: string;
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
  skills: Skills;
  jobTitle: string;
}

export interface KeyAttributes {
  technicalSkills: string[];
  concepts: string[];
  interpersonalSkills: string[];
}

export type PreviewCV = Omit<CV, "id" | "cvPDFName" | "date" | "title">;

export type CVFormData = Omit<CV, "id" | "cvPDFName" | "date">;

export interface Skills {
  soft: string[];
  technical: string[];
}

export interface ReccomendedExperience {
  id: Experience["id"];
  recommended: boolean;
  reason: string | null;
}

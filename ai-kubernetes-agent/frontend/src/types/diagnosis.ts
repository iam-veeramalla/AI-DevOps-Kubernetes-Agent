export type Diagnosis = {
  status: "ready" | "running" | "complete" | "failed";
  rootCause?: string;
  suggestedFix?: string;
};


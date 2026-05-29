
export interface UserProfile {
  industry: string;
  primaryRole: string; // Comma separated if multiple
  selectedTasks: string[]; // Specific tasks selected by user
  jobDescription?: string; 
  resumeText: string;
  resumeFile?: {
    data: string; // base64
    mimeType: string;
  };
}

export enum TaskRiskType {
  AUTOMATED = 'Automated',
  AUGMENTED = 'Augmented',
  EXCLUSIVE = 'Human-Exclusive'
}

export interface ImpactTask {
  task: string;
  automationRisk: string; // High, Medium, Low
  aiCollaboration: string; // High, Medium, Low
  type: string;
  keyTools: string;
  techImpact: string;
  notes: string;
}

export interface CertificationItem {
  name: string;
  url: string;
}

export interface RoadmapPhase {
  focus: string;
  skills: string[];
  certifications: CertificationItem[];
  actions: string[];
}

export interface Roadmap {
  month3: RoadmapPhase;
  month6: RoadmapPhase;
  month12: RoadmapPhase;
}

export interface LearningResource {
  title: string;
  url: string;
  type: string;
}

export interface Tool {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  resources: LearningResource[];
}

export interface Tool {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  resources: LearningResource[];
}

export interface CareerPivot {
  role: string;
  matchScore: number;
  reason: string;
}

export interface AnalysisResult {
  impactTable: ImpactTask[];
  survivalScore: {
    score: number;
    explanation: string;
  };
  roadmap: Roadmap;
  pivots: CareerPivot[];
  tools: Tool[];
}

export enum AppStep {
  LANDING = -1,
  INDUSTRY = 0,
  ROLE_INPUT = 1,
  TASK_GENERATION = 2,
  TASK_SELECTION = 3,
  RESUME_UPLOAD = 4,
  ANALYZING = 5,
  RESULTS = 6,
}

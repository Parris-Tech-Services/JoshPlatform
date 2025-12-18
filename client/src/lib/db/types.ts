export interface PlatformMoveOp {
  id?: number;
  title: string;
  status: 'todo' | 'doing' | 'done';
  dueDate?: string;
  sortOrder?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformDecisionCard {
  id?: number;
  question: string;
  status: 'open' | 'parked' | 'decided';
  dueBy?: string;
  decision?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformOpportunity {
  id?: number;
  name: string;
  stage: 'seed' | 'shaped' | 'experiment' | 'validated' | 'committed' | 'parked';
  expectedValuePerMonth?: number;
  probability?: number;
  stressCost?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlatformWeeklyReview {
  id?: number;
  weekStart: string; // YYYY-MM-DD
  wins?: string;
  drains?: string;
  lifeGivers?: string;
  top3?: string;
  oneExperiment?: string;
  createdAt: string;
  updatedAt: string;
}

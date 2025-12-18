import Dexie, { type Table } from 'dexie';
import { 
  PlatformMoveOp, 
  PlatformDecisionCard, 
  PlatformOpportunity, 
  PlatformWeeklyReview 
} from './types';

export class JoshHubDatabase extends Dexie {
  platformMoveOps!: Table<PlatformMoveOp>;
  platformDecisionCards!: Table<PlatformDecisionCard>;
  platformOpportunities!: Table<PlatformOpportunity>;
  platformWeeklyReviews!: Table<PlatformWeeklyReview>;

  constructor() {
    super('JoshHubDB');
    
    this.version(1).stores({
      platformMoveOps: '++id, status, dueDate, sortOrder, createdAt',
      platformDecisionCards: '++id, status, dueBy, createdAt',
      platformOpportunities: '++id, stage, expectedValuePerMonth, createdAt',
      platformWeeklyReviews: '++id, weekStart, createdAt'
    });
  }
}

export const db = new JoshHubDatabase();

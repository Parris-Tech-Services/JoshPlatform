import { useLiveQuery } from 'dexie-react-hooks';
import { moveOpsRepo } from '../../lib/repos/dexie/platform/moveOpsRepoDexie';
import { decisionCardsRepo } from '../../lib/repos/dexie/platform/decisionCardsRepoDexie';
import { opportunitiesRepo } from '../../lib/repos/dexie/platform/opportunitiesRepoDexie';
import { weeklyReviewsRepo } from '../../lib/repos/dexie/platform/weeklyReviewsRepoDexie';
import { tasksRepo } from '../../lib/repos/dexie/platform/tasksRepoDexie';
import { seedPlatformData } from '../../lib/repos/dexie/platform/seed';

export * from '../../lib/db/types';

export const usePlatformMoveOps = () => {
  return useLiveQuery(() => moveOpsRepo.list()) ?? [];
};

export const usePlatformDecisionCards = () => {
  return useLiveQuery(() => decisionCardsRepo.list()) ?? [];
};

export const usePlatformOpportunities = () => {
  return useLiveQuery(() => opportunitiesRepo.list()) ?? [];
};

export const usePlatformWeeklyReviews = () => {
  return useLiveQuery(() => weeklyReviewsRepo.list()) ?? [];
};

export const usePlatformTasks = () => {
  return useLiveQuery(() => tasksRepo.list()) ?? [];
};

export const platformActions = {
  moveOps: moveOpsRepo,
  decisions: decisionCardsRepo,
  opportunities: opportunitiesRepo,
  reviews: weeklyReviewsRepo,
  tasks: tasksRepo,
  seed: seedPlatformData,
};

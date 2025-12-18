import { db } from '../../../db/dexie';
import { moveOpsRepo } from './moveOpsRepoDexie';
import { decisionCardsRepo } from './decisionCardsRepoDexie';
import { opportunitiesRepo } from './opportunitiesRepoDexie';
import { weeklyReviewsRepo } from './weeklyReviewsRepoDexie';
import { tasksRepo } from './tasksRepoDexie';

export async function seedPlatformData() {
  const count = await db.platformMoveOps.count();
  if (count > 0) return;

  console.log('Seeding Platform Data...');

  const moveOps = [
    { title: 'Jan Juc', status: 'done', dueDate: '2026-01-01' },
    { title: 'Dad arrives Mon 12 Jan 2026', status: 'todo', dueDate: '2026-01-12' },
    { title: 'Convoy Wed 14 Jan', status: 'todo', dueDate: '2026-01-14' },
    { title: 'Mazda service Thu 15 Jan', status: 'todo', dueDate: '2026-01-15' },
    { title: 'DCS start Mon 19 Jan', status: 'todo', dueDate: '2026-01-19' },
    { title: 'Kristy infusion 28/29 Jan', status: 'todo', dueDate: '2026-01-28' },
    { title: 'Family drive ~30 Jan', status: 'todo', dueDate: '2026-01-30' },
    { title: 'Utilities', status: 'doing', dueDate: '2026-01-10' },
    { title: 'Keys', status: 'doing', dueDate: '2026-01-10' },
  ] as const;

  for (const op of moveOps) {
    await moveOpsRepo.add(op);
  }

  const decisions = [
    { question: 'Preschool day confirmation', status: 'open', dueBy: '2026-01-20' },
    { question: 'Service NSW appointment', status: 'open', dueBy: '2026-01-15' },
    { question: 'Internet at Boundary', status: 'decided', decision: 'NBN', dueBy: '2025-12-20' },
    { question: 'Kristy work arrangement', status: 'parked' },
  ] as const;

  for (const d of decisions) {
    await decisionCardsRepo.add(d);
  }

  const opportunities = [
    { name: 'Build JoshPlatform', stage: 'committed', expectedValuePerMonth: 0 },
    { name: 'Parris Tech Services', stage: 'experiment', expectedValuePerMonth: 500 },
  ] as const;

  for (const o of opportunities) {
    await opportunitiesRepo.add(o);
  }

  const tasks = [
    { title: 'Pack boxes', status: 'done', dueDate: '2026-01-10' },
    { title: 'Book moving truck', status: 'doing', dueDate: '2026-01-12' },
    { title: 'Update address', status: 'todo', dueDate: '2026-01-15' },
    { title: 'Transfer utilities', status: 'todo', dueDate: '2026-01-20' },
  ] as const;

  for (const t of tasks) {
    await tasksRepo.add(t);
  }

  await weeklyReviewsRepo.add({
    weekStart: '2026-01-12',
    wins: 'Moved in!',
    drains: 'Unpacking',
    top3: '1. Unpack kitchen\n2. Set up internet\n3. Rest',
  });
  
  console.log('Seeding Complete.');
}

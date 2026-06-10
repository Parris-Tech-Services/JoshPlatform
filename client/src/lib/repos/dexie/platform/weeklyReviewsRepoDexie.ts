import { db } from '../../../db/dexie';
import { PlatformWeeklyReview } from '../../../db/types';

export const weeklyReviewsRepo = {
  async list() {
    return await db.platformWeeklyReviews.orderBy('weekStart').reverse().toArray();
  },

  async add(data: Omit<PlatformWeeklyReview, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await db.platformWeeklyReviews.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, patch: Partial<PlatformWeeklyReview>) {
    return await db.platformWeeklyReviews.update(id, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return await db.platformWeeklyReviews.delete(id);
  }
};

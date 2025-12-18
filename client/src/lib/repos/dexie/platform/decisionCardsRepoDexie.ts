import { db } from '../../../db/dexie';
import { PlatformDecisionCard } from '../../../db/types';

export const decisionCardsRepo = {
  async list() {
    return await db.platformDecisionCards.orderBy('status').toArray();
  },

  async add(data: Omit<PlatformDecisionCard, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await db.platformDecisionCards.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, patch: Partial<PlatformDecisionCard>) {
    return await db.platformDecisionCards.update(id, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return await db.platformDecisionCards.delete(id);
  },

  async setStatus(id: number, status: PlatformDecisionCard['status']) {
    return this.update(id, { status });
  }
};

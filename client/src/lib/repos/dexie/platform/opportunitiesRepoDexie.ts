import { db } from '../../../db/dexie';
import { PlatformOpportunity } from '../../../db/types';

export const opportunitiesRepo = {
  async list() {
    return await db.platformOpportunities.orderBy('stage').toArray();
  },

  async add(data: Omit<PlatformOpportunity, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await db.platformOpportunities.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, patch: Partial<PlatformOpportunity>) {
    return await db.platformOpportunities.update(id, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return await db.platformOpportunities.delete(id);
  },

  async setStage(id: number, stage: PlatformOpportunity['stage']) {
    return this.update(id, { stage });
  }
};

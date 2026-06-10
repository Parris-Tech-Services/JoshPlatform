import { db } from '../../../db/dexie';
import { PlatformMoveOp } from '../../../db/types';

export const moveOpsRepo = {
  async list() {
    return await db.platformMoveOps.orderBy('status').toArray();
  },

  async add(data: Omit<PlatformMoveOp, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await db.platformMoveOps.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, patch: Partial<PlatformMoveOp>) {
    return await db.platformMoveOps.update(id, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return await db.platformMoveOps.delete(id);
  },

  async setStatus(id: number, status: PlatformMoveOp['status']) {
    return this.update(id, { status });
  }
};

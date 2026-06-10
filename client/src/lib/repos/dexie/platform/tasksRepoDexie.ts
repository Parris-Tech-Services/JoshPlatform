import { db } from '../../../db/dexie';
import { PlatformTask } from '../../../db/types';

export const tasksRepo = {
  async list() {
    return await db.platformTasks.orderBy('status').toArray();
  },

  async add(data: Omit<PlatformTask, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    return await db.platformTasks.add({
      ...data,
      createdAt: now,
      updatedAt: now,
    });
  },

  async update(id: number, patch: Partial<PlatformTask>) {
    return await db.platformTasks.update(id, {
      ...patch,
      updatedAt: new Date().toISOString(),
    });
  },

  async delete(id: number) {
    return await db.platformTasks.delete(id);
  },

  async setStatus(id: number, status: PlatformTask['status']) {
    return this.update(id, { status });
  }
};

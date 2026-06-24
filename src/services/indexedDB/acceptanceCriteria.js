import { dbPromise } from "./db";

export async function saveCriteria(
  taskId,
  value
) {
  const db = await dbPromise;

  await db.put(
    "acceptanceCriteria",
    value,
    taskId
  );
}

export async function getCriteria(
  taskId
) {
  const db = await dbPromise;

  return await db.get(
    "acceptanceCriteria",
    taskId
  );
} 
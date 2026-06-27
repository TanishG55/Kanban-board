import { dbPromise } from "./db";

export async function saveTasks(
  tasks
) {
  const db =
    await dbPromise;

  const tx =
    db.transaction(
      "tasks",
      "readwrite"
    );

  await tx.store.clear();

  for (const task of tasks) {
    await tx.store.put(
      task
    );
  }

  await tx.done;
}

export async function getTasks() {
  const db =
    await dbPromise;

  return await db.getAll(
    "tasks"
  );
}
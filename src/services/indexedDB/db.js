import { openDB } from "idb";

export const dbPromise = openDB("TaskDB", 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("acceptanceCriteria")) {
      db.createObjectStore("acceptanceCriteria");
    }

    // tasks storee
    if (!db.objectStoreNames.contains("tasks")) {
      db.createObjectStore("tasks", {
        keyPath: "id",
      });
    }
  },
});

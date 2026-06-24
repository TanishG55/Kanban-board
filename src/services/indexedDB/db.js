import { openDB } from "idb";

export const dbPromise = openDB(
  "TaskDB",
  1,
  {
    upgrade(db) {
      if (
        !db.objectStoreNames.contains(
          "acceptanceCriteria"
        )
      ) {
        db.createObjectStore(
          "acceptanceCriteria"
        );
      }
    },
  }
);
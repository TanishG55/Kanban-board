export const filterTasks = (tasks, query, assignee, status, priority) => {
  return tasks.filter((task) => {
    const q = !query || task.id.toLowerCase().includes(query.toLowerCase());
    const a = !assignee || task.assignee.name === assignee;
    const s = !status || task.status === status;
    const p = !priority || task.priority === priority;
    return q && a && s && p;
  });
};

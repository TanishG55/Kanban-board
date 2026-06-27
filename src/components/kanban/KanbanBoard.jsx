import { useState, useEffect } from "react";
import Column from "./Column";

import { columns } from "../../constants/columns";
import { initialTasks, Priorities } from "../../constants/tasks";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import KanbanFilters from "./KanbanFilters";
import { filterTasks } from "../../helpers/filterTasks";
import { getTasks, saveTasks } from "../../services/indexedDB/taskStorage";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  const [allCols] = useState(columns);
  const [priorities] = useState(Priorities);

  const [query, Setquery] = useState("");
  const [SelectedAssignee, SetSelectedAssignee] = useState("");
  const [SelectedPriority, SetSelectedPriority] = useState("");
  const [SelectedStatus, SetSelectedStatus] = useState("");

  const [openModal, setOpenModal] = useState(false);
  // const [selectedTask, setSelectedTask] = useState(null);
  // console.log(selectedTask , "selected-taskkkk");
  // useLockBodyScroll(openModal || Boolean(selectedTask));

  useLockBodyScroll(openModal);

  const uniqueAssignees = [
    ...new Map(
      tasks.map((task) => [task.assignee.name, task.assignee]),
    ).values(),
  ];

  const filteredTasks = filterTasks(
    tasks,
    query,
    SelectedAssignee,
    SelectedStatus,
    SelectedPriority,
  );

  const moveTask = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  useEffect(() => {
    async function loadTasks() {
      const stored = await getTasks();
      console.log(stored);

      if (stored.length === 0) {
        await saveTasks(initialTasks);

        setTasks(initialTasks);
      } else {
        setTasks(stored);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length) {
      saveTasks(tasks);
    }
  }, [tasks]);

  return (
    <div className="p-4 bg-slate-50 overflow-auto">
      <h1 className="mb-6 text-lg font-bold font-outfit text-primary">
        Kanban Board
      </h1>

      {/* search bar and filters   */}
      <KanbanFilters
        SelectQuery={Setquery}
        SelectAssignee={SetSelectedAssignee}
        SelectPriority={SetSelectedPriority}
        SelectStatus={SetSelectedStatus}
        setOpenModal={setOpenModal}
        uniqueAssignees={uniqueAssignees}
        columns={columns}
        priorities={priorities}
      />

      <div className="flex flex-col gap-4 overflow-x-auto pb-4">
        <div className="flex flex-col gap-4 overflow-x-auto pb-4">
          <div className="flex gap-4">
            {allCols.map((column) => (
              <Column
                key={column}
                title={column}
                tasks={filteredTasks.filter((task) => task.status === column)}
                moveTask={moveTask}
                setTasks={setTasks}
                // onOpenTask={setSelectedTask}
              />
            ))}
          </div>
        </div>
      </div>
      {/* {selectedTask && (
        <CreateTask
          onClose={() => setSelectedTask(null)}
          state="open"
          task={selectedTask}
          setTasks={setTasks}
        />
      )} */}
      {/* {openModal && (
        <CreateTask onClose={() => setOpenModal(false)} setTasks={setTasks} />
      )} */}
    </div>
  );
}

export default KanbanBoard;

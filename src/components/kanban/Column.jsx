import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";
import { useState } from "react";
import TaskModal from "../modals/TaskModal";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

const ITEM_TYPE = "TASK";

function Column({ title, tasks, moveTask, setTasks }) {
  const [openModal, setOpenModal] = useState(false);

  useLockBodyScroll(openModal);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item) => {
      moveTask(item.id, title);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className="
    flex-none
    w-[340px]
    min-w-[340px]       
    rounded-[8px]
    bg-neutral-100
    p-md
    flex
    flex-col
    gap-2
    font-outfit
  "
      style={{
        backgroundColor: `${isOver ? "bg-blue-100" : "bg-neutral-100"}`,
      }}
    >
      <div className="flex items-center aligns-center justify-between gap-2 mb-1">
        <div className="flex flex-row items-center aligns-center gap-[8px]">
          <h2 className="text-sm font-semibold text-primary whitespace-normal break-words">
            {title}
          </h2>
          <span className="text-[12px] text-slate-500">{tasks.length}</span>
        </div>

        <div className="flex flex-row gap-[8px]">
          <Plus
            onClick={() => setOpenModal(true)}
            className="cursor-pointer"
            size={12}
          />
        </div>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          setTasks={setTasks}
          // onOpenTask={onOpenTask}
        />
      ))}

      <button
        onClick={() => setOpenModal(true)}
        className="flex flex-row gap-xs items-center aligns-center cursor-pointer"
      >
        <Plus size={16} />
        <span className="text-[14px]">New</span>
      </button>

       {openModal && (
        <TaskModal onClose={() => setOpenModal(false)} setTasks={setTasks} />
      )} 
    </div>
  );
}

export default Column;

import { useState } from "react";
import { useDrag } from "react-dnd";
import { High, Medium, Low, Profile } from "../../UI/Icons";


import { useNavigate } from "react-router-dom";
import {
  Timer,
  Paperclip,
  MessagesSquare,
  EllipsisVertical,
} from "lucide-react";

import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import TaskModal from "../modals/TaskModal";

const ITEM_TYPE = "TASK";

function TaskCard({ task, setTasks }) {
  const navigate = useNavigate();
  const [openTaskModal, setopenTaskModal] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);

  useLockBodyScroll(openTaskModal);

  const priorityStyles = {
    High: {
      icon: High,
      text: "text-red-500",
      bg: "bg-red-100",
    },
    Medium: {
      icon: Medium,
      text: "text-amber-500",
      bg: "bg-amber-100",
    },
    Low: {
      icon: Low,
      text: "text-green-500",
      bg: "bg-green-100",
    },
  };

  const icon = priorityStyles[task?.priority];

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: {
      id: task.id,
      status: task.status,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const DeleteTask = (taskID) => {
    setTasks((prev) => prev.filter((task) => task.id != taskID));
    setOptionsModal(false);
  };

  return (
    <>
      <div
        onClick={() => {
          // if (openEditModal || optionsModal) return;
          setopenTaskModal(!openTaskModal);
        }}
        ref={drag}
        className="cursor-pointer w-[316px] rounded-[8px] border border-border bg-surface p-3 flex flex-col gap-xs font-outfit shadow-card select-none"
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "grab",
        }}
      >
        <div className="flex flex-row item-center align-center justify-between">
          <div
            className={`text-[10px] h-[16px] p-1 rounded-[4px] ${icon?.bg} ${icon?.text} flex items-center justify-center`}
          >
            {task.priority}
          </div>

          <div className="flex flex-row gap-4">
            <div className="relative flex flex-row gap-xs items-center aligns-center text-muted">
              <Timer size={12} />
              <span className="text-[10px]">{task.dueDate}</span>
              <div>
                <EllipsisVertical
                  onClick={(e) => {
                    e.stopPropagation();
                    setOptionsModal(!optionsModal);
                  }}
                  className="cursor-pointer"
                  size={12}
                />

                {optionsModal && (
                  <div className="absolute right-0 top-5 bg-white shadow rounded p-2 z-10 cursor-pointer">
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOptionsModal(false);
                        setOpenEditModal(true);
                      }}
                      className="block text-sm cursor-pointer"
                    >
                      Edit
                    </button> */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        DeleteTask(task.id);
                      }}
                      className="block text-sm text-red-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-[14px] font-semibold break-words">
          {task.title}
        </div>

        <span className="text-[16px] font-semibold  text-slate-500">
          {task.description}
        </span>

        <div className="flex flex-row items-center aligns-center justify-between mt-xs text-base font-semibold text-primary whitespace-nowrap">
          <div className="flex flex-row gap-xs items-center aligns-center">
            <div className="flex flex-row gap-[8px] items-center aligns-center">
              {<Paperclip size={12} />}
              <span className="text-[10px]">{task.attachmentsCount}</span>

              {<MessagesSquare size={12} />}
              <span className="text-[10px]">{task.commentsCount}</span>
            </div>
          </div>

          {task.assignee.name != "Unassigned" && (
            <div className="flex items-center justify-center">
              {<Profile/>}
            </div>
          )}
        </div>
      </div>
      {openTaskModal && (
        <TaskModal
          // state="open"
          task={task}
          setTasks={setTasks}
          onClose={() => setopenTaskModal(false)}
        />
      )}
    </>
  );
}

export default TaskCard;

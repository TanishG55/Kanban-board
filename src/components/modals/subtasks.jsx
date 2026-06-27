import { useState } from "react";
import { Plus, UserRound } from "lucide-react";
import { columns } from "../../constants/columns";
import { Priorities, USERS } from "../../constants/tasks";
import { High, Medium, Low, Profile } from "../../UI/Icons";

function Subtasks({ subtasks = [], setTaskForm, updateTaskForm }) {
  const [subtaskInput, setSubtaskInput] = useState("");

  const priorityStyles = {
    High: {
      icon: High,
      text: "text-red-500",
    },
    Medium: {
      icon: Medium,
      text: "text-amber-500",
    },
    Low: {
      icon: Low,
      text: "text-green-500",
    },
  };

  const addSubtask = () => {
    if (!subtaskInput.trim()) return;

    const newSubtask = {
      id: Date.now(),
      title: subtaskInput,
      completed: false,
      priority: "Medium",
      assignee: null,
      status: "TO DO",
    };

    setTaskForm((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, newSubtask],
    }));

    setSubtaskInput("");
  };

  const toggleSubtask = (id) => {
    setTaskForm((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((s) =>
        s.id === id ? { ...s, completed: !s.completed } : s,
      ),
    }));
  };

  return (
    <div>
      <div className="mt-3 border border-gray-200 rounded-[8px] overflow-hidden">
        {/* Progress */}
        {/* <div className="p-4 border-b">
          <div className="w-full h-2 bg-gray-200 rounded">
            <div
              className="h-full bg-gray-500 rounded"
              style={{
                width: `${
                  subtasks?.length
                    ? (subtasks.filter((s) => s.completed).length /
                        subtasks.length) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>

          <p className="text-sm text-gray-500 mt-2">
            {subtasks?.length
              ? Math.round(
                  (subtasks.filter((s) => s.completed).length /
                    subtasks.length) *
                    100,
                )
              : 0}
            % Done
          </p>
        </div> */}

        {/* Header */}
        <div className="grid grid-cols-[minmax(0,90px)_120px_160px_120px] px-4 py-3 bg-gray-50 font-sans text-[12px] leading-[16px] font-[653] text-[#505258] border-b">
          <span>Work</span>
          <span>Priority</span>
          <span>Assignee</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        {subtasks?.map((subtask) => (
          <div
            key={subtask.id}
            className="grid grid-cols-[minmax(0,90px)_120px_160px_120px] px-4 py-3 border-b items-center"
          >
            <div className="flex gap-2 items-center">
              {/* <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(subtask.id)}
              /> */}

              <span class="font-sans text-sm leading-5 font-normal text-[#292A2E] cursor-pointer truncate">
                {subtask.title}
              </span>
            </div>

            {/* <select
              value={subtask.priority || "Medium"}
              onChange={(e) => {
                updateTaskForm(
                  "subtasks",
                  subtasks.map((s) =>
                    s.id === subtask.id
                      ? { ...s, priority: e.target.value }
                      : s,
                  ),
                );
              }}
              className="outline-none appearance-none font-sans text-sm leading-5 font-normal text-[#292A2E] cursor-pointer"
            >
              {Priorities.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select> */}
            <div className="flex items-center gap-2">
              {(() => {
                const PriorityIcon =
                  priorityStyles[subtask.priority || "Medium"]?.icon;

                return (
                  <>
                    {PriorityIcon && (
                      <PriorityIcon
                        size={20}
                        className={
                          priorityStyles[subtask.priority || "Medium"].text
                        }
                      />
                    )}

                    <select
                      value={subtask.priority || "Medium"}
                      onChange={(e) => 
                        setTaskForm((prev) => ({
                          ...prev,
                          subtasks: prev.subtasks.map((s) =>
                            s.id === subtask.id
                              ? { ...s, priority: e.target.value }
                              : s,
                          ),
                        }))
                      }
                      className="w-full min-w-0 truncate outline-none appearance-none font-sans text-sm leading-5 font-normal cursor-pointer"
                    >
                      {Priorities.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </>
                );
              })()}
            </div>

            <div className="flex items-center gap-2 min-w-0">
              {subtask.assignee ? (
                <Profile size={18} />
              ) : (
                <UserRound size={18} className="text-gray-400" />
              )}

              <select
                value={subtask.assignee?.id || ""}
                onChange={(e) => {
                  const selectedUser =
                    USERS.find((user) => user.id === e.target.value) || null;

                  setTaskForm((prev) => ({
                    ...prev,
                    subtasks: prev.subtasks.map((s) =>
                      s.id === subtask.id
                        ? {
                            ...s,
                            assignee: selectedUser,
                          }
                        : s,
                    ),
                  }));
                }}
                className="w-full min-w-0 truncate outline-none appearance-none font-sans text-sm cursor-pointer"
              >
                <option value="">Unassigned</option>

                {USERS.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={subtask.status || "TODO"}
              onChange={(e) =>
                updateTaskForm(
                  "subtasks",
                  subtasks.map((s) =>
                    s.id === subtask.id ? { ...s, status: e.target.value } : s,
                  ),
                )
              }
              className="w-full min-w-0 truncate outline-none appearance-none font-sans text-sm leading-5 font-normal text-[#292A2E] cursor-pointer"
            >
              {columns.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Add Row */}

        <div className="flex  items-center aligns-center justify-between">
          <input
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSubtask();
            }}
            placeholder="Name this subtask"
            className="flex-1 px-4 py-3 outline-none font-sans font-[400] text-[14px] leading-[20px] text-[rgb(41,42,46)]"
          />


          <button
            onClick={addSubtask}
            className="w-12 pointer-cursor h-full border-l hover:bg-gray-50 flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subtasks;

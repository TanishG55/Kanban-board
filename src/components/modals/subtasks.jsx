import { useState } from "react";
import { Plus } from "lucide-react";
import { columns } from "../../constants/columns";
import { Priorities } from "../../constants/tasks";

function Subtasks({ subtasks = [], setTaskForm }) {
  const [subtaskInput, setSubtaskInput] = useState("");

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
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-3 bg-gray-50 font-sans text-[12px] leading-[16px] font-[653] text-[#505258] border-b">
          <span>Work</span>
          <span>Priority</span>
          <span>Assignee</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        {subtasks?.map((subtask) => (
          <div
            key={subtask.id}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] px-4 py-3 border-b items-center"
          >
            <div className="flex gap-2 items-center">
              {/* <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => toggleSubtask(subtask.id)}
              /> */}

              <span class="font-sans text-sm leading-5 font-normal text-[#292A2E] cursor-pointer">
                {subtask.title}
              </span>
            </div>

            <select
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
            </select>

            <span class="font-sans text-sm leading-5 font-normal text-[#292A2E] cursor-pointer">
              {subtask.assignee?.name || "Unassigned"}
            </span>

            <select
              value={subtask.status || "TO DO"}
              onChange={(e) =>
                updateTaskForm(
                  "subtasks",
                  subtasks.map((s) =>
                    s.id === subtask.id ? { ...s, status: e.target.value } : s,
                  ),
                )
              }
              className="outline-none appearance-none font-sans text-sm leading-5 font-normal text-[#292A2E] cursor-pointer"
            >
              {columns.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        ))}

        {/* Add Row */}

        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] border-t items-center">
          <input
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSubtask();
            }}
            placeholder="Name this subtask"
            className="px-4 py-3 outline-none font-sans font-[400] text-[14px] leading-[20px] text-[rgb(41,42,46)]"
          />

          <div />
          <div />

          <button
            onClick={addSubtask}
            className="h-full border-l hover:bg-gray-50 flex items-center justify-center"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Subtasks;

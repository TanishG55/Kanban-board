import React from "react";
import { useState, useEffect } from "react";
import {
  SquarePen,
  Bookmark,
  LockOpen,
  Eye,
  Share2,
  Ellipsis,
  Minimize2,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Bot,
  Sparkles,
  Check,
  Bolt,
  UserRound,
  Calendar,
  Flag,
} from "lucide-react";
import { initialTasks } from "../../constants/tasks";
import { columns } from "../../constants/columns";
import { USERS, Priorities } from "../../constants/tasks";
import Subtasks from "./subtasks";
import { High, Low, Medium } from "../../UI/Icons";

function TaskModal({ onClose, setTasks, state, task }) {
  const [expandDescription, setExpandDescription] = useState(true);
  const [expandDetails, setExpandDetails] = useState(true);
  const [expandTasks, setExpandTasks] = useState(true);
  // const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [subtaskInput, setSubtaskInput] = useState("");

  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // editing states
  const [editTitle, SeteditTitle] = useState(task.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  function generateTHID() {
    const randomNum = Math.floor(Math.random() * 10000);
    const formattedNum = String(randomNum);
    return `TH-${formattedNum}`;
  }

  const [label, setLabel] = useState("");

  const [TaskForm, setTaskForm] = useState({
    id: task.id,

    title: task.title,
    description: task.description,

    status: task.status,

    feature: {
      id: task.feature.id,
      name: task.feature.name,
      color: "#2563eb",
    },

    priority: task.priority,

    assignee: {
      id: task.assignee.id,
      name: task.assignee.name,
      avatar: "",
    },

    reporter: task.reporter,

    labels: task.labels,

    storyPoints: task.storyPoints,

    environment: task.environment,

    dueDate: task.dueDate,

    createdAt: task.createdAt,
    updatedAt: task.updatedAt,

    commentsCount: task.commentsCount,
    attachmentsCount: task.attachmentsCount,

    subtasks: task.subtasks,
  });

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

  const PriorityIcon = priorityStyles[TaskForm.priority]?.icon;
  const currentPriority = priorityStyles[TaskForm.priority];
  console.log(currentPriority);

  useEffect(() => {
    if ((state === "edit" && task) || (state === "open" && task)) {
      setTaskForm(task);
    }
  }, [state, task]);

  const editTask = () => {
    const updatedTask = { ...TaskForm };
    setTasks((prev) =>
      prev.map((eachTask) =>
        eachTask.id === task.id ? updatedTask : eachTask,
      ),
    );
    onClose();
  };

  const addTask = () => {
    setTasks((prev) => [...prev, TaskForm]);
    onClose();
  };

  const keydown = (event) => {
    if (event.key == "Enter" && label.trim()) {
      setTaskForm((prevOBJ) => ({
        ...prevOBJ,
        labels: [...prevOBJ.labels, label],
      }));
      setLabel("");
    }
  };

  const addSubtask = () => {
    if (!subtaskInput.trim()) return;

    const newSubtask = {
      id: Date.now(),
      title: subtaskInput,
      completed: false,
    };

    setTaskForm((prev) => ({
      ...prev,
      subtasks: [...(prev.subtasks || []), newSubtask],
    }));

    setSubtaskInput("");
  };

  // const toggleSubtask = (id) => {
  //   setTaskForm((prev) => ({
  //     ...prev,
  //     subtasks: prev.subtasks.map((item) =>
  //       item.id === id ? { ...item, completed: !item.completed } : item,
  //     ),
  //   }));
  // };

  const updateTaskForm = (field, value) => {
    setTaskForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="w-[1000px] h-[400px] p-10 rounded-md bg-surface border border-border overflow-y-auto">
        {/* header of the ticket */}
        <div className="flex flex-row items-center aligns-center">
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row items-center aligns-center gap-[8px]">
              <button className="flex flex-row gap-[8px] cursor-pointer">
                <SquarePen size={16} />
                <span className="text-[12px] leading-4 font-sans text-[#505258]">
                  Add epic
                </span>
              </button>

              <span>/</span>

              <div className="flex flex-row gap-[8px] items-center aligns-center">
                <Bookmark
                  className="cursor-pointer"
                  size={16}
                  color="#4fde6c"
                />
                <button>
                  <span className="flex items-center aligns-center cursor-pointer text-[12px] leading-4 font-sans text-[#505258]">
                    Scrum-2
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-row gap-[12px] items-center aligns-center">
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <LockOpen
                  size={20}
                  color="rgb(80, 82, 88)"
                  strokeWidth={1.75}
                />
              </button>
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <Eye size={20} color="rgb(80, 82, 88)" strokeWidth={1.75} />
              </button>
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <Share2 size={20} color="rgb(80, 82, 88)" strokeWidth={1.75} />
              </button>
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <Ellipsis
                  size={20}
                  color="rgb(80, 82, 88)"
                  strokeWidth={1.75}
                />
              </button>
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <Minimize2
                  size={20}
                  color="rgb(80, 82, 88)"
                  strokeWidth={1.75}
                />
              </button>
              <button
                onClick={() => {
                  setTasks((prev) =>
                    prev.map((t) => (t.id === TaskForm.id ? TaskForm : t)),
                  );
                  onClose();
                }}
                className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]"
              >
                <X size={20} color="rgb(80, 82, 88)" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* content side by side divide into two halves */}
        <div className="flex flex-row justify-between">
          {/* lhs */}
          <div className="mt-4 flex flex-col gap-[12px]">
            {/* left side content */}
            <div>
              <div>
                {isEditingTitle ? (
                  <input
                    value={TaskForm.title}
                    autoFocus
                    onChange={(e) => {
                      updateTaskForm("title", e.target.value);
                    }}
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setIsEditingTitle(false);
                    }}
                    className="text-[24px] font-[653] border-b outline-none w-full"
                  />
                ) : (
                  <span
                    onClick={() => setIsEditingTitle(true)}
                    className="cursor-pointer font-sans text-[24px] font-[653] leading-[28px] text-[rgb(41,42,46)]"
                  >
                    {TaskForm.title}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-[8px]">
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <Plus size={20} color="rgb(80, 82, 88)" strokeWidth={1.75} />
              </button>
              <button className="flex items-center justify-center cursor-pointer h-8 w-8  px-0.5 py-0 border border-gray-300 rounded-[4px]">
                <Ellipsis
                  size={20}
                  color="rgb(80, 82, 88)"
                  strokeWidth={1.75}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => setExpandDescription(!expandDescription)}
                className="flex flex-row items-center aligns-center gap-2 cursor-pointer"
              >
                {expandDescription ? (
                  <ChevronDown size={16} strokeWidth={1.75} />
                ) : (
                  <ChevronUp size={16} strokeWidth={1.75} />
                )}

                <span className="font-sans text-[16px] font-[653] leading-[20px] text-[#292a2e]">
                  Description
                </span>
              </button>
              {expandDescription && (
                <div
                  onClick={() => setIsEditingDescription(true)}
                  className="text-sm font-normal leading-5 text-[#6B6E76] cursor-pointer"
                >
                  {isEditingDescription ? (
                    <textarea
                      autoFocus
                      value={TaskForm.description}
                      onChange={(e) =>
                        updateTaskForm("description", e.target.value)
                      }
                      onBlur={() => setIsEditingDescription(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.shiftKey === false) {
                          e.preventDefault();
                          setIsEditingDescription(false);
                        }
                      }}
                      className="w-full border p-2 rounded text-sm"
                    />
                  ) : (
                    TaskForm.description || "Click to add description..."
                  )}
                </div>
              )}
              <button
                onClick={() => setExpandTasks(!expandTasks)}
                className="flex flex-row items-center aligns-center gap-2 cursor-pointer"
              >
                {expandTasks ? (
                  <ChevronDown size={16} strokeWidth={1.75} />
                ) : (
                  <ChevronUp size={16} strokeWidth={1.75} />
                )}
                <span className="font-sans text-[16px] font-[653] leading-[20px] text-[#292a2e]">
                  Subtasks
                </span>
              </button>
              {expandTasks && (
                <Subtasks
                  subtasks={TaskForm.subtasks}
                  setTaskForm={setTaskForm}
                  updateTaskForm = {updateTaskForm}
                />
              )}
            </div>
          </div>
          {/* rhs */}
          <div className="w-[360px] shrink-0 flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4 mt-4">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="w-auto truncate justify-between cursor-pointer flex items-center gap-1 rounded-xs px-3 py-1.5 text-sm font-medium bg-gray-200 whitespace-nowrap"
                >
                  {TaskForm.status}
                  <ChevronDown size={14} strokeWidth={2.5} />
                </button>

                {showStatusDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    {columns.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          updateTaskForm("status", status);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                          TaskForm.status === status
                            ? "bg-gray-50 font-medium"
                            : ""
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="cursor-pointer flex flex-row items-center gap-1.5 rounded-xs border border-gray-200 bg-surface px-3 py-1.5 text-sm font-medium text-slate-700 whitespace-nowrap"
              >
                <Bot size={16} className="text-slate-600" />
                Agents
              </button>

              <button
                type="button"
                className="cursor-pointer flex flex-row items-center gap-1.5 rounded-xs border border-gray-200 bg-surface px-3 py-1.5 text-sm font-medium text-slate-700 whitespace-nowrap"
              >
                <Sparkles size={16} className="text-slate-600" />
                Improve Tasks
              </button>
            </div>

            <div className="flex flex-col  gap-2 border border-gray-300 p-2 rounded-[8px]">
              <button
                onClick={() => setExpandDetails(!expandDetails)}
                className="flex flex-row aligns-center items-center gap-2 cursor-pointer"
              >
                {" "}
                {expandDetails ? (
                  <ChevronDown size={16} strokeWidth={1.75} />
                ) : (
                  <ChevronRight size={16} strokeWidth={1.75} />
                )}
                <span className="font-[500] text-[16px] leading-[20px] text-[rgb(41,42,46)] font-sans">
                  Details
                </span>
              </button>
              {expandDetails && (
                <div className="mt-3 p-3">
                  <div className="grid grid-cols-[120px_1fr] gap-y-5">
                    {/* Assignee */}
                    <span className="font-medium font-sans text-[14px] leading-[19px] text-[#505258]">
                      Assignee
                    </span>

                    <select
                      value={TaskForm.assignee?.id}
                      onChange={(e) => {
                        const selected = USERS.find(
                          (user) => user.id === e.target.value,
                        );

                        updateTaskForm("assignee", selected);
                      }}
                      className="cursor-pointer appearance-none border-0 outline-none focus:ring-0  font-sans text-[14px] leading-[20px] text-[#292A2E]"
                    >
                      {USERS.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>

                    {/* Priority */}
                    <span className="font-medium font-sans text-[14px] leading-[19px] text-[#505258]">
                      Priority
                    </span>

                    <div className="flex flex-row gap-2 items-center">
                      {PriorityIcon && (
                        <PriorityIcon
                          size={20}
                          className={currentPriority.text}
                        />
                      )}

                      <select
                        value={TaskForm.priority}
                        onChange={(e) =>
                          updateTaskForm("priority", e.target.value)
                        }
                        className="cursor-pointer appearance-none border-0 outline-none focus:ring-0  font-sans text-[14px] leading-[20px] text-[#292A2E]"
                      >
                        {Priorities.map((priority) => (
                          <option className="p-2" key={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Due Date */}
                    <span className="font-medium font-sans text-[14px] leading-[19px] text-[#505258]">
                      Due date
                    </span>

                    <input
                      type="date"
                      value={TaskForm.dueDate}
                      onChange={(e) =>
                        updateTaskForm("dueDate", e.target.value)
                      }
                      className="cursor-pointer appearance-none border-0 outline-none focus:ring-0  font-sans text-[14px] leading-[20px] text-[#292A2E]"
                    />

                    {/* Labels */}
                    {/* <span className="font-medium font-sans text-[14px] leading-[19px] text-[#505258]">
                      Labels
                    </span>

                    <input
                      value={TaskForm.labels.join(", ")}
                      onChange={(e) =>
                        updateTaskForm(
                          "labels",
                          e.target.value.split(",").map((v) => v.trim()),
                        )
                      }
                      placeholder="UI, Frontend"
                      className="cursor-pointer appearance-none border-0 outline-none focus:ring-0  font-sans text-[14px] leading-[20px] text-[#292A2E]"
                    /> */}

                    {/* Story Points */}
                    <span className="font-medium font-sans text-[14px] leading-[19px] text-[#505258]">
                      Story Points
                    </span>

                    <input
                      type="number"
                      value={TaskForm.storyPoints}
                      onChange={(e) =>
                        updateTaskForm("storyPoints", Number(e.target.value))
                      }
                      className="cursor-pointer appearance-none border-0 outline-none focus:ring-0  font-sans text-[14px] leading-[20px] text-[#292A2E]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;

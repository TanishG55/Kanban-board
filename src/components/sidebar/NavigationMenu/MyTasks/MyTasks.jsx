import { useState } from "react";
import { UserRound, Pencil } from "lucide-react";
import { High, Medium, Low, Profile } from "../../../../UI/icons";
import {
  FEATURES,
  initialTasks,
  Priorities,
} from "../../../../constants/tasks";
import { columns } from "../../../../constants/columns";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import TaskDetails from "../../../task/TaskDetails";

function MyTasks() {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const [tasks, setTasks] = useLocalStorage("tasks", initialTasks);
  const selectedTask = tasks.find((task) => task.id === taskId);

  const [onHover, SetonHover] = useState(null);
  const [edit, setEdit] = useState(null);
  const [showPriorityDropdown, SetshowPriorityDropdown] = useState(null);
  const [showStatusDropdown, SetshowStatusDropdown] = useState(null);
  const [showFeatureDropdown, setShowFeatureDropdown] = useState(null);
  const statuses = columns;

  const [newTitle, setnewTitle] = useState("");

  const myicons = {
    High: {
      icon: High,
      text: "text-green-600",
      bg: "bg-green-100",
    },
    Medium: {
      icon: Medium,
      text: "text-amber-500",
      bg: "bg-amber-100",
    },
    Low: {
      icon: Low,
      text: "text-red-500",
      bg: "bg-red-100",
    },
  };

  const updatedTask = (taskID) => {
    setTasks((prevTasks) =>
      prevTasks.map((eachtask) =>
        eachtask.id === taskID
          ? {
              ...eachtask,
              title: newTitle,
            }
          : eachtask,
      ),
    );
    setEdit(null);
  };

  const updatedPriority = (taskID, selectedPriority) => {
    setTasks((prevTasks) =>
      prevTasks.map((eachtask) =>
        eachtask.id === taskID
          ? {
              ...eachtask,
              priority: selectedPriority,
            }
          : eachtask,
      ),
    );

    SetshowPriorityDropdown(null);
  };

  const updatedStatus = (taskID, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((eachtask) =>
        eachtask.id === taskID
          ? {
              ...eachtask,
              status: status,
            }
          : eachtask,
      ),
    );

    SetshowStatusDropdown(null);
  };

  const updatedFeature = (taskID, feature) => {
    setTasks((prevTasks) =>
      prevTasks.map((eachtask) =>
        eachtask.id === taskID
          ? {
              ...eachtask,
              feature,
            }
          : eachtask,
      ),
    );

    setShowFeatureDropdown(null);
  };

  const openTaskDetails = (task) => {
    navigate(`/Backlog/task/${task.id}`, {
      state: {
        task,
      },
      replace: Boolean(taskId),
    });
  };

  const closeTaskDetails = () => {
    navigate("/Backlog");
  };

  return (
    <div className="flex h-screen min-w-0 flex-1 overflow-hidden bg-slate-50">
      <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-4">
        <div className="w-full border border-border rounded-sm overflow-visible bg-surface">
          {tasks.map((task) => {
            const icon = myicons[task?.priority];
            const Icon = icon?.icon;
            const isSelected = selectedTask?.id === task.id;

            return (
              <div
                onClick={() => openTaskDetails(task)}
                key={task.id}
                aria-current={isSelected ? "true" : undefined}
                className={`grid grid-cols-[92px_minmax(140px,1.35fr)_minmax(120px,1fr)_minmax(104px,0.75fr)_42px_36px] items-center gap-3 border-b border-border px-3 py-1 text-sm cursor-pointer ${
                  isSelected ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <div className="text-slate-700 font-medium whitespace-nowrap">
                  {task.id}
                </div>

                <div
                  onMouseEnter={() => SetonHover(task.id)}
                  onMouseLeave={() => SetonHover(null)}
                  className="min-w-0 cursor-pointer flex items-center gap-xs"
                >
                  <div className="min-w-0 hover:underline text-slate-700">
                    {edit === task.id ? (
                      <input
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setnewTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                            updatedTask(task.id);
                          }
                        }}
                        type="text"
                        value={newTitle}
                        className="w-full min-w-0"
                      />
                    ) : (
                      <span className="block truncate">{task.title}</span>
                    )}
                  </div>
                  {onHover === task.id && (
                    <Pencil
                      onClick={(e) => {
                        e.stopPropagation();
                        setEdit(task.id);
                        setnewTitle(task.title);
                      }}
                      size={14}
                    />
                  )}
                </div>

                <div className="relative min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFeatureDropdown(task.id);
                    }}
                    className="block max-w-full truncate bg-blue-100 text-blue-700 px-2 py-1 rounded whitespace-nowrap"
                  >
                    {task.feature?.name}
                  </button>

                  {showFeatureDropdown === task.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-10 z-10 w-44 bg-white border rounded shadow"
                    >
                      {FEATURES.map((feature) => (
                        <button
                          type="button"
                          key={feature.id}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50"
                          onClick={() => updatedFeature(task.id, feature)}
                        >
                          {feature.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status */}

                <div className="relative min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      SetshowStatusDropdown(task.id);
                    }}
                    className="block max-w-full truncate bg-slate-100 px-3 py-1 rounded whitespace-nowrap"
                  >
                    {task.status}
                  </button>

                  {showStatusDropdown === task.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-11 left-0 z-10 w-36 rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden"
                    >
                      {statuses.map((status) =>
                        status !== task.status ? (
                          <button
                            type="button"
                            key={status}
                            className="block w-full text-left px-3 py-2 hover:bg-slate-50"
                            onClick={() => updatedStatus(task.id, status)}
                          >
                            {status}
                          </button>
                        ) : null,
                      )}
                    </div>
                  )}
                </div>

                <div className="relative flex justify-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      SetshowPriorityDropdown(task.id);
                    }}
                    className={`flex items-center justify-center w-9 h-9 rounded-full ${icon?.bg} ${icon?.text} hover:scale-105 transition`}
                  >
                    {Icon && <Icon size={18} />}
                  </button>

                  {showPriorityDropdown === task.id && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-11 left-0 z-10 w-36 rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden"
                    >
                      {Priorities.map((eachPriority) => {
                        const PriorityIcon = myicons[eachPriority]?.icon;

                        return (
                          task.priority !== eachPriority && (
                            <button
                              type="button"
                              onClick={() =>
                                updatedPriority(task.id, eachPriority)
                              }
                              key={eachPriority}
                              className="w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-50 text-left"
                            >
                              <PriorityIcon size={16} />
                              <span>{eachPriority}</span>
                            </button>
                          )
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* assigned */}

                <div className="flex justify-center">
                  {task.assignee?.avatar ? <UserRound /> : <Profile />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedTask && (
        <aside className="h-full w-[360px] shrink-0 border-l border-border bg-surface">
          <TaskDetails
            key={selectedTask.id}
            task={selectedTask}
            state="open"
            setTasks={setTasks}
            onClose={closeTaskDetails}
          />
        </aside>
      )}
    </div>
  );
}

export default MyTasks;

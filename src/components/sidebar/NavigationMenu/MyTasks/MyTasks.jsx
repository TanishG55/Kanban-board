import { useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ChevronDown, ChevronRight, UserRound, Pencil } from "lucide-react";
import { High, Medium, Low, Profile } from "../../../../UI/Icons";
import {
  FEATURES,
  initialTasks,
  Priorities,
} from "../../../../constants/tasks";
import { columns } from "../../../../constants/columns";
import { useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import TaskDetails from "../../../task/TaskDetails";

const TASK_ROW_TYPE = "MY_TASK_ROW";

function DraggableTaskRow({
  children,
  featureId,
  index,
  moveTask,
  taskId,
}) {
  const rowRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: TASK_ROW_TYPE,
      item: { id: taskId, featureId, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [featureId, index, taskId],
  );

  const [, drop] = useDrop(
    () => ({
      accept: TASK_ROW_TYPE,
      hover: (item, monitor) => {
        if (
          !rowRef.current ||
          item.id === taskId ||
          item.featureId !== featureId
        ) {
          return;
        }

        const bounds = rowRef.current.getBoundingClientRect();
        const pointer = monitor.getClientOffset();

        if (!pointer) return;

        const pointerY = pointer.y - bounds.top;
        const middleY = (bounds.bottom - bounds.top) / 2;

        if (item.index < index && pointerY < middleY) return;
        if (item.index > index && pointerY > middleY) return;

        const insertAfter = item.index < index;
        moveTask(item.id, taskId, featureId, insertAfter);
        item.index = index;
      },
      drop: (item, monitor) => {
        if (
          !rowRef.current ||
          item.id === taskId ||
          item.featureId === featureId
        ) {
          return;
        }

        const bounds = rowRef.current.getBoundingClientRect();
        const pointer = monitor.getClientOffset();
        const insertAfter = pointer
          ? pointer.y > bounds.top + (bounds.bottom - bounds.top) / 2
          : false;

        moveTask(item.id, taskId, featureId, insertAfter);
        item.featureId = featureId;
        item.index = index;
      },
    }),
    [featureId, index, moveTask, taskId],
  );

  const connectRow = useCallback(
    (node) => {
      rowRef.current = node;
      drag(drop(node));
    },
    [drag, drop],
  );

  return (
    <div ref={connectRow} style={{ opacity: isDragging ? 0.45 : 1 }}>
      {children}
    </div>
  );
}

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
  // expanding state for each features
  const [expanded, setExpanded] = useState({});

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

  const groupedTasks = tasks.reduce((acc, task) => {
    const featureId = task.feature?.id || "backlog";

    if (!acc[featureId]) {
      acc[featureId] = {
        id: featureId,
        title: task.feature?.name || "Backlog",
        tasks: [],
      };
    }

    acc[featureId].tasks.push(task);

    return acc;
  }, {});

  // toggle for each feature

  const toggleSprint = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const moveTask = useCallback(
    (draggedTaskId, targetTaskId, targetFeatureId, insertAfter) => {
      if (draggedTaskId === targetTaskId) return;

      setTasks((prevTasks) => {
        const draggedIndex = prevTasks.findIndex(
          (task) => task.id === draggedTaskId,
        );
        const targetTask = prevTasks.find(
          (task) => task.id === targetTaskId,
        );

        if (draggedIndex === -1 || !targetTask) return prevTasks;

        const nextTasks = [...prevTasks];
        const [draggedTask] = nextTasks.splice(draggedIndex, 1);
        const targetIndex = nextTasks.findIndex(
          (task) => task.id === targetTaskId,
        );

        if (targetIndex === -1) return prevTasks;

        const movedTask =
          draggedTask.feature?.id === targetFeatureId
            ? draggedTask
            : {
                ...draggedTask,
                feature: targetTask.feature ?? null,
              };

        nextTasks.splice(targetIndex + (insertAfter ? 1 : 0), 0, movedTask);
        return nextTasks;
      });
    },
    [setTasks],
  );

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
        <div className="w-full overflow-visible">
          {Object.values(groupedTasks).map((group) => (
            <div
              key={group.id}
              className="mb-3 overflow-visible rounded-sm border border-border bg-surface"
            >
              <div className="h-14 bg-slate-100 rounded flex items-center px-4">
                <button
                  type="button"
                  onClick={() => toggleSprint(group.id)}
                  className="mr-3 text-lg cursor-pointer"
                  aria-expanded={Boolean(expanded[group.id])}
                >
                  {expanded[group.id] ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex gap-2 items-center">
                    <span className="font-sans font-bold text-[14px] leading-[20px] text-[#292A2E]">{group.title}</span>
                    <span className='font-normal text-[14px] leading-5 text-[#292A2E]'>
                      ({group.tasks.length} work items)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="font-medium text-[14px] leading-[20px] text-[#505258] border border-[#DCDFE4] rounded-[4px] cursor-pointer px-3 py-1"
                >
                  Complete sprint
                </button>
              </div>

              {expanded[group.id] &&
                group.tasks.map((task, taskIndex) => {
                  const icon = myicons[task?.priority];
                  const Icon = icon?.icon;
                  const isSelected = selectedTask?.id === task.id;

                  return (
                    <DraggableTaskRow
                      key={task.id}
                      taskId={task.id}
                      featureId={group.id}
                      index={taskIndex}
                      moveTask={moveTask}
                    >
              <div
                onClick={() => openTaskDetails(task)}
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
                    </DraggableTaskRow>
                  );
                })}
            </div>
          ))}
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

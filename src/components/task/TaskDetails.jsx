import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  saveCriteria,
  getCriteria,
} from "../../services/indexedDB/acceptanceCriteria";
import {
  X,
  ChevronDown,
  Plus,
  SquareCheck,
  ExternalLink,
  Bookmark,
  Eye,
  Share2,
  Ellipsis,
  Bolt,
  Bot,
  Sparkles,
  Check,
  ChevronUp,
} from "lucide-react";
import { columns } from "../../constants/columns";

const createEmptyTaskForm = () => ({
  id: "",

  title: "",
  description: "",

  acceptanceCriteria: "",

  status: "Todo",

  feature: {
    id: "F1",
    name: "",
    color: "#2563eb",
  },

  priority: "Medium",

  assignee: {
    id: "U1",
    name: "Unassigned",
    avatar: "",
  },

  reporter: "Admin",

  labels: [],

  storyPoints: 1,

  environment: "Development",

  dueDate: "",

  createdAt: "",
  updatedAt: "",

  commentsCount: 0,
  attachmentsCount: 0,

  subtasks: [],
});

function TaskDetails({ onClose, setTasks, task: selectedTask }) {
  const location = useLocation();
  const navigate = useNavigate();

  const task = selectedTask || location.state?.task;

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  const [ExpandDetails, setExpandDetails] = useState(true);

  // new feature of subtask , comments etc.
  const [expandSubtasks, setExpandSubtasks] = useState(true);
  const [expandComments, setExpandComments] = useState(true);

  const [subtaskInput, setSubtaskInput] = useState("");
  const [commentInput, setCommentInput] = useState("");

  const [subtasks, setSubtasks] = useState(task?.subtasks || []);
  const [comments, setComments] = useState([]);

  const [TaskForm, setTaskForm] = useState(() => task || createEmptyTaskForm());

  useEffect(() => {
    async function load() {
      if (!task?.id) return;

      const saved = await getCriteria(task.id);

      if (saved) {
        setTaskForm((prev) => ({
          ...prev,
          acceptanceCriteria: saved,
        }));
      }
    }

    load();
  }, [task?.id]);

  const closeDetails = () => {
    if (onClose) {
      onClose();
      return;
    }

    navigate("/Backlog");
  };

  const updateTaskForm = (updates) => {
    const updatedTask = {
      ...TaskForm,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    setTaskForm(updatedTask);
    setTasks?.((prevTasks) =>
      prevTasks.map((eachTask) =>
        eachTask.id === task.id ? updatedTask : eachTask,
      ),
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: TaskForm.title,
      text: TaskForm.description,
      url: `${window.location.origin}/task/${TaskForm.id}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        alert("Task link copied to clipboard");
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  //  functions for adding subtasks and comments
  const addSubtask = () => {
    if (!subtaskInput.trim()) return;

    setSubtasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: subtaskInput,
        completed: false,
      },
    ]);

    setSubtaskInput("");
  };

  const toggleSubtask = (id) => {
    setSubtasks((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
          : item,
      ),
    );
  };

  const addComment = () => {
    if (!commentInput.trim()) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: commentInput,
      },
    ]);

    setCommentInput("");
  };

  if (!task) {
    return (
      <div className="h-full bg-surface p-6 text-sm text-slate-500">
        Select a task to view details.
      </div>
    );
  }

  return (
    <div className="h-full min-w-0 overflow-y-auto bg-surface">
        {/* top header  */}
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between p-2 border-b border-gray-200 bg-surface">
          <div className="flex flex-row gap-sm items-center">
            <SquareCheck size={16} />
            <span>Jira Work item</span>
          </div>

          <div className="flex flex-row gap-sm items-center">
            <ExternalLink className="cursor-pointer" size={16} />
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeDetails();
              }}
              className="cursor-pointer border border-black-400 p-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* main div content */}
        <div className="px-6 py-3">
          {/* header */}
          <div className="flex flex-row items-center justify-between">
            {/* info */}
            <div className="flex flex-row gap-sm items-center">
              <Bookmark size={16} color="#4fde6c" />
              <span className="text-[12px]">{task.id}</span>
            </div>
            {/* actions */}
            <div className="flex flex-row items-center gap-sm">
              <button className="cursor-pointer flex flex-row gap-sm items-center border border-gray-200 p-1">
                <Eye size={16} />
                {/* task view not in json currently hardcoded */}
                <span className="text-[12px]">3</span>
              </button>
              <button
                onClick={handleShare}
                className="cursor-pointer border border-gray-200  p-1"
              >
                <Share2 size={16} />
              </button>
              <button className="cursor-pointer border border-gray-200  p-1">
                <Ellipsis size={16} />
              </button>
            </div>
          </div>

          {/* title */}
          <div className="mt-3">
            <span className="text-xl font-bold break-words">{task.title}</span>
          </div>

          {/* actions */}
          <div className="flex flex-row gap-sm mt-3">
            <button className="border border-gray-400 p-1 rounded-[2px]">
              <Plus size={16} />
            </button>
            <button className="border border-gray-400 p-1 rounded-[2px]">
              <Bolt size={16} />
            </button>
          </div>

          {/* status */}
          <div className="mt-3 flex flex-row flex-wrap items-center gap-4">
            {/* <button
              type="button"
              className="cursor-pointer flex flex-row items-center gap-1 rounded-xs bg-[#94d82b] px-3 py-1.5 text-sm font-medium text-slate-800"
            >
              Done
              <ChevronDown size={14} strokeWidth={2.5} />
            </button> */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                className="cursor-pointer flex items-center gap-1 rounded-xs px-3 py-1.5 text-sm font-medium bg-gray-200"
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
                        updateTaskForm({ status });
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
              className="cursor-pointer flex flex-row items-center gap-1.5 rounded-xs border border-gray-200 bg-surface px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              <Bot size={16} className="text-slate-600" />
              Agents
            </button>

            <div className="flex flex-row items-center gap-1.5 text-sm font-medium text-slate-700">
              <Check size={16} className="text-green-500" />
              Done
            </div>

            <button
              type="button"
              className="cursor-pointer flex items-center justify-center rounded-xs border border-gray-200 bg-surface p-2"
            >
              <Bolt size={16} className="text-slate-600" />
            </button>

            <button
              type="button"
              className="cursor-pointer flex flex-row items-center gap-1.5 rounded-xs border border-gray-200 bg-surface px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              <Sparkles size={16} className="text-slate-600" />
              Improve Story
            </button>
          </div>

          {/* key details */}
          <div className="mt-3">
            <button
              onClick={() => setExpandDetails(!ExpandDetails)}
              className="cursor-pointer flex flex-row items-center aligns-center gap-xs"
            >
              {ExpandDetails ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
              <span className="text-base text-gray-500">Key details</span>
            </button>
            {/* expanded details form */}
            {ExpandDetails && (
              <div className="flex flex-col gap-sm p-4 pt-0 mt-2">
                <div className="flex flex-col gap-sm">
                  <span className="text-sm text-black-500">Description</span>
                  {/* <span className="text-sm text-black-500 bg-gray-100 p-1">
                    {task.description}
                  </span> */}
                  {isEditingDescription ? (
                    <textarea
                      value={TaskForm.description}
                      onChange={(e) =>
                        updateTaskForm({ description: e.target.value })
                      }
                      onBlur={() => setIsEditingDescription(false)}
                      rows={3}
                      autoFocus
                      className="text-sm bg-gray-100 p-2 border rounded"
                    />
                  ) : (
                    <div
                      onClick={() => setIsEditingDescription(true)}
                      className="text-sm text-black-500 bg-gray-100 p-2 cursor-pointer"
                    >
                      {TaskForm.description || "Click to add description"}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-sm">
                  <span className="text-sm text-black-500">
                    Acceptance Criteria
                  </span>
                  <textarea
                    value={TaskForm.acceptanceCriteria}
                    onChange={async (e) => {
                      const value = e.target.value;

                      updateTaskForm({ acceptanceCriteria: value });

                      await saveCriteria(task.id, value);
                    }}
                    autoFocus={false}
                    rows={5}
                    className="text-xs border-none"
                    placeholder="Add text"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SUBTASKS */}

          <div>
            <button
              onClick={() => setExpandSubtasks(!expandSubtasks)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <ChevronDown size={16} />

              <span className="text-base text-gray-500">Subtasks</span>
            </button>

            {expandSubtasks && (
              <div className="mt-3">
                <div className="flex flex-row gap-2">
                  <input
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    placeholder="Add subtask"
                    className="flex-1 border-b p-2 outline-none text-[12px]"
                  />

                  <button className="cursor-pointer" onClick={addSubtask}>
                    <Plus size={16} />
                  </button>
                </div>

                <div className="mt-4 space-y-3">
                  {subtasks.map((item) => (
                    <label key={item.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleSubtask(item.id)}
                      />

                      <span
                        className={
                          item.completed
                            ? "line-through text-gray-400 text-[12px]"
                            : "text-[12px]"
                        }
                      >
                        {item.title}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COMMENTS */}

          <div className="mt-8">
            <button
              onClick={() => setExpandComments(!expandComments)}
              className="flex flex-row items-center aligns-center gap-2 cursor-pointer"
            >
              <ChevronDown size={16} />

              <span className="text-base text-gray-500">Comments</span>
            </button>

            {expandComments && (
              <>
                <div className="mt-4 space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <div className="text-[12px] bg-gray-50 p-1 rounded">
                        {comment.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Write comment..."
                    className="flex-1 border rounded p-2 text-[12px]"
                  />

                  <button
                    onClick={addComment}
                    className="border px-3 text-[12px] cursor-pointer"
                  >
                    Post
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
    </div>
  );
}

export default TaskDetails;

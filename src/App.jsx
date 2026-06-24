import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import KanbanBoard from "./components/kanban/KanbanBoard";
import Sidebar from "./components/sidebar/Sidebar";
import TaskModal from "./components/modals/TaskModal";
import MyTasks from "./components/sidebar/NavigationMenu/MyTasks/MyTasks";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<KanbanBoard />}>
            </Route>
            <Route path="/Backlog" element={<MyTasks />} />
            <Route path="/Backlog/task/:taskId" element={<MyTasks />} />
          </Routes>
        </div>
        {/* <TaskModal /> */}
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;

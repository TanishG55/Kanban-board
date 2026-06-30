import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import KanbanBoard from "./components/kanban/KanbanBoard";
import Sidebar from "./components/sidebar/Sidebar";
import TaskModal from "./components/modals/TaskModal";
import MyTasks from "./components/sidebar/NavigationMenu/MyTasks/MyTasks";

const ROUTES = {
  home: "/",
  backlog: "/Backlog",
  task: "/Backlog/task/:taskId",
};

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path={ROUTES.home} element={<KanbanBoard />}></Route>
            <Route path={ROUTES.backlog} element={<MyTasks />} />
            <Route path={ROUTES.task} element={<MyTasks />} />
          </Routes>
        </div>
        {/* <TaskModal /> */}
      </BrowserRouter>
    </DndProvider>
  );
}

export default App;

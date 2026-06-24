import { createContext , useContext , useState } from "react";

const ModalContext = createContext();

export function ModalProvider ({children}) {

  const [selectedTask, setSelectedTask] = useState(null);
  const [newTask , setNewTask] = useState(false);
 
  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };
  
    return (
    <ModalContext.Provider
      value={{
        selectedTask,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );

}


export const useModal = () => useContext(ModalContext);



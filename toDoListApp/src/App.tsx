import React, { useState, useEffect } from "react";
import TaskSpawner from "./components/TaskSpawner";
import TaskManager from "./components/TaskManager";
import { TaskActions } from "./types/TaskActions";

/*
game spawn, edit, kill Task gameObject 

the Task gameObject has: id - name - status (alive or dead)
if a task is dead then you can't edit 
*/

// the task data structure
export interface Task {
  id: number;
  name: string;
  status: boolean;
}

// there must be a gameobject to define the Task with it's functions (properties) -> TaskGameObject
// a gameobject to spawn (create) Task -> TaskSpawner
// a gameobject to List and Edit Task's (check completition or change name) -> TaskManager
// then -> three React (tsx) components

const App: React.FC = () => {

  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTaskList = localStorage.getItem("taskList");
    return savedTaskList ? JSON.parse(savedTaskList) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList])

  const createTask = (taskName: string): void => {
    const newTask: Task = { id: Date.now(), name: taskName, status: false};
    setTaskList([...taskList, newTask]);
  };

  const changeTaskStatus = (taskID: number): void => {
    setTaskList(
      taskList.map(task => 
        task.id === taskID ? { ...task, status: !task.status } : task
      )
    );
  };

  const editTask = (taskID: number, newName: string): void => {
    setTaskList(
      taskList.map(task =>
        task.id === taskID ? { ...task, name: newName } : task
      )
    );
  };

  const deleteTask = (taskID: number): void => {
    setTaskList(taskList.filter(task => task.id !== taskID));
  };

  const taskActions: TaskActions = 
  {
    changeTaskStatus: changeTaskStatus,
    deleteTask: deleteTask,
    editTask: editTask,
  }

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="bg-gray-700 p-8 rounded shadow-md w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <TaskSpawner createTask={createTask} />
        <TaskManager taskList={taskList} {...taskActions} />
      </div>
    </div>
  )
}

export default App
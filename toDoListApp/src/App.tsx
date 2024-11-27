import React, { useState, useEffect } from "react";
import TaskSpawner from "./components/TaskSpawner";
import { TaskActions } from "./types/TaskActions";
import TaskCounter from "./components/TaskCounter";
import TaskViewer from "./components/TaskViewer";

/*
game spawn, edit, kill Task 

the Task gameObject has: id - name - completed (alive or dead)
if a task is completed (dead) then you can't edit 
*/

// the task data structure
export interface Task {
  id: number;
  name: string;
  completed: boolean;
}

// there must be a gameobject to define the Task with it's functions and behaviour (properties) -> TaskGameObject
// a gameobject to spawn (create) Task -> TaskSpawner
// a gameobject to List task's -> TaskViewer
// a gameobject to show the uncompleted Tasks -> TaskCounter 
// then -> four React (tsx) components

const App: React.FC = () => {

  // define task List and setter using localStorage
  const [taskList, setTaskList] = useState<Task[]>(() => {
    const savedTaskList = localStorage.getItem("taskList");
    return savedTaskList ? JSON.parse(savedTaskList) : [];
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList])

  // create new task and add to task list
  const createTask = (taskName: string): void => {
    const newTask: Task = { id: Date.now(), name: taskName, completed: false};
    setTaskList([...taskList, newTask]);
  };

  // change task status completition
  const changeTaskStatus = (taskID: number): void => {
    setTaskList(
      taskList.map(task => 
        task.id === taskID ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // edit task name
  const editTask = (taskID: number, newName: string): void => {
    setTaskList(
      taskList.map(task =>
        task.id === taskID ? { ...task, name: newName } : task
      )
    );
  };

  // delete task from task list
  const deleteTask = (taskID: number): void => {
    setTaskList(taskList.filter(task => task.id !== taskID));
  };

  // group all functions to TaskAction type to reference it to TaskViewer
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
        <TaskCounter count={taskList.filter(task => !task.completed).length} />
        <TaskViewer taskList={taskList} {...taskActions} />
      </div>
    </div>
  )
}

export default App
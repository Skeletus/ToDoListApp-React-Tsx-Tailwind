import React, { useState, useEffect } from "react";
import TaskSpawner from "./components/TaskSpawner";
import TaskManager from "./components/TaskManager";

/*
game spawn, manipulate, kill Task gameObject 

the Task gameObject has: id - name - status (alive or dead)
if a task is dead then you can't edit 

*/

// the task gameObject
export interface Task {
  id: number;
  name: string;
  status: boolean;
}

// there must be a gameobject to spawn Task
// a gameobject to handle Task (manipulate or kill)
// a gameobject to list all Task's
// then -> three React (tsx) components

function App() {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="bg-gray-700 p-8 rounded shadow-md w-1/3">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do List</h1>
        <TaskSpawner>
          
        </TaskSpawner>
        <TaskManager>

        </TaskManager>
      </div>
    </div>
  )
}

export default App
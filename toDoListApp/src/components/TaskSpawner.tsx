// this is the react component that Create new tasks
import React, { useState } from 'react'

interface TaskSpawnerProps
{
    createTask: (taskName: string) => void;
}

const TaskSpawner: React.FC<TaskSpawnerProps> = ({ createTask }) => {
    
    // taskName string status variable and setter initialize with empty string
    const [taskName, setTaskName] = useState<string>("");

    // handle submit button 
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void =>
    {
        event.preventDefault();
        if(taskName.trim())
        {
            createTask(taskName.trim());
            setTaskName("");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 w-full sm:flex-row sm:items-center sm:gap-2">
        <input
            type="text"
            className="border border-gray-600 bg-gray-800 text-white p-2 flex-1 rounded focus:outline-none focus:ring focus:ring-orange-500"
            placeholder="Nueva tarea"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
        />
        <button className="bg-orange-700 text-white font-bold px-4 py-2 rounded hover:bg-orange-700 sm:w-auto w-full">
            Agregar
        </button>
        </form>
    );
};

export default TaskSpawner
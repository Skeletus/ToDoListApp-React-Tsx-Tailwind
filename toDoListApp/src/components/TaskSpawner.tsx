import React, { useState } from 'react'

interface TaskSpawnerProps
{
    createTask: (taskName: string) => void;
}

const TaskSpawner: React.FC<TaskSpawnerProps> = ({ createTask }) => {
    
    const [taskName, setTaskName] = useState<string>("");

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
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
            type="text"
            className="border border-gray-300 p-2 flex-1 rounded"
            placeholder="Nueva tarea"
            value={taskName}
            onChange={e => setTaskName(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Agregar
        </button>
        </form>
    );
};

export default TaskSpawner
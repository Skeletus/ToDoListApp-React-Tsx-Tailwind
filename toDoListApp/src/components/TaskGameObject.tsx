import React, { useState } from 'react'
import { TaskActions } from '../types/TaskActions'
import { Task } from '../App'

interface TaskGameObjectProps extends TaskActions
{
    task: Task;
}

const TaskGameObject: React.FC<TaskGameObjectProps> = ({ task, ...actions}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(task.name);

    const handleEdit = (): void =>
    {
        if (isEditing && newName.trim())
        {
            actions.editTask(task.id, newName.trim());
        }
        setIsEditing(!isEditing);
    }

    return (
        <li className="flex items-center justify-between border-b p-2">
        <input
            type="checkbox"
            checked={task.status}
            onChange={() => actions.changeTaskStatus(task.id)}
        />
        {isEditing ? (
            <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            />
        ) : (
            <span className={task.status ? 'line-through' : ''}>
            {task.name}
            </span>
        )}
        <button onClick={handleEdit}>{isEditing ? 'Guardar' : 'Editar'}</button>
        <button onClick={() => actions.deleteTask(task.id)}>Eliminar</button>
        </li>
    );
};

export default TaskGameObject;
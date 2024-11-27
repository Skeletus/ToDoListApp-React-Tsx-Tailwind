// this is the react component that manages the Edit and Delete functions

import React, { useState } from 'react'
import { TaskActions } from '../types/TaskActions'
import { Task } from '../App'
import { AiFillEdit, AiFillSave } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

interface TaskGameObjectProps extends TaskActions
{
    task: Task;
}

const TaskGameObject: React.FC<TaskGameObjectProps> = ({ task, ...actions}) => {
    // isEditing boolean status variable and setter initialize with false
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // newName string status variable and setter initialize with the referenced task name
    const [newName, setNewName] = useState<string>(task.name);

    // function to handle edit button
    const handleEdit = (): void =>
    {
        if (isEditing && newName.trim())
        {
            actions.editTask(task.id, newName.trim());
        }
        setIsEditing(!isEditing);
    }
    
    // flag
    const isEditable = !task.completed;

    return (
        <li className="flex items-center justify-between border-b p-2">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => actions.changeTaskStatus(task.id)}
                disabled={isEditing}
            />
            {isEditing ? (
                <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                disabled={!isEditable}
                />
            ) : (
                <span className={task.completed ? 'line-through' : ''}>
                {task.name}
                </span>
            )}
            <button onClick={handleEdit} disabled={!isEditable }>
                {isEditing ? <AiFillSave className='text-xl'/> : <AiFillEdit className='text-xl'/>}
            </button>
            <button onClick={() => actions.deleteTask(task.id)} disabled={isEditing}>
                <BsFillTrashFill className='text-xl'/>
            </button>
        </li>
    );
};

export default TaskGameObject;
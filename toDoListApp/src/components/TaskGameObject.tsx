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
        <li className="flex items-center justify-between border-b p-2 bg-gray-700 rounded-lg mb-2">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => actions.changeTaskStatus(task.id)}
                disabled={isEditing}
            />
            {isEditing ? (
                <div className="overflow-x-auto max-w-full">
                    <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    disabled={!isEditable}
                    className="bg-gray-800 text-white p-2 rounded focus:ring focus:ring-orange-500 overflow-x-auto max-w-full"
                    />
                </div>
                
            ) : (
                <div className="overflow-x-auto max-w-full">
                    <span className={`font-bold ${task.completed ? 'line-through text-gray-500' : 'text-green-400'}`}>
                        {task.name}
                    </span>
                </div>
            )}
            <div className="flex gap-2 ml-2">
                <button onClick={handleEdit} disabled={!isEditable } className="ml-2">
                    {isEditing ? <AiFillSave className='text-xl text-green-500'/> : <AiFillEdit className='text-xl text-yellow-500'/>}
                </button>
                <button onClick={() => actions.deleteTask(task.id)} disabled={isEditing} className="ml-2">
                    <BsFillTrashFill className='text-xl text-red-500'/>
                </button>
            </div>
            
        </li>
    );
};

export default TaskGameObject;
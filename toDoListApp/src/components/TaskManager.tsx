import React from 'react'
import { TaskActions } from '../types/TaskActions'
import { Task } from '../App';
import TaskGameObject from './TaskGameObject';

interface TaskManagerProps extends TaskActions
{
    taskList: Task[];
}

const TaskManager: React.FC<TaskManagerProps> = (props) => {
    const { taskList } = props;

    return (
        <ul className="list-none p-0">
            {taskList.map((task) => (
                <TaskGameObject key={task.id} task={task} {...props} />
            ))}
        </ul>
    );
};

export default TaskManager
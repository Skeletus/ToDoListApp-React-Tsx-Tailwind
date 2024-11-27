// this is the react component that will display all task in task list
import React from 'react'
import { TaskActions } from '../types/TaskActions'
import { Task } from '../App';
import TaskGameObject from './TaskGameObject';

interface TaskViewerProps extends TaskActions
{
    taskList: Task[];
}

const TaskViewer: React.FC<TaskViewerProps> = (props) => {
    const { taskList } = props;

    return (
        <ul className="list-none p-0">
            {taskList.map((task) => (
                <TaskGameObject key={task.id} task={task} {...props} />
            ))}
        </ul>
    );
};

export default TaskViewer
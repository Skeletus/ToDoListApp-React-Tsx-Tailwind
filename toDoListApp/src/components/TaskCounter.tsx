// this is the react component that will display the number of uncompleted tasks
import React from "react";

interface TaskCounterProps
{
    count: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ count }) => (
    <div className="mb-4">
        <strong>Tareas pendientes: {count}</strong>
    </div>
);

export default TaskCounter;
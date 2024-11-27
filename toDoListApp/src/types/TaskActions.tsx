export interface TaskActions 
{
    changeTaskStatus: (taskID: number) => void;
    deleteTask: (taskID: number) => void;
    editTask: (taskID: number, newName: string) => void;
}
  
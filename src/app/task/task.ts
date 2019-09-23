export interface Task {
    _id?: string;
    projectId?: string;
    projectName?: string;
    taskName?: string;
    priority?: number;
    parentTaskId?: string;
    parentTaskName?: string;
    startDate?: Date;
    endDate?: Date;
    status?: string; 
    userName?: string;   
}

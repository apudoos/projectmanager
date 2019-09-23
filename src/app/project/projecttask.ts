export class IProjectTask {
    _id?:string;
    projectName?: string;
    startDate?: Date;
    endDate?: Date;  
    priority?: number;
    managerId?: number;
    taskCount?: number;
    completed?: string;
}
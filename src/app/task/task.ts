export class Task {
    _id?: string;
    projectId: string;
    taskName: string;
    priority: number;
    parentTaskId: string;
    startDate: Date;
    endDate: Date;
    status: string;
}

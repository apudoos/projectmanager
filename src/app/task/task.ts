export class Task {
    _id?: String;
    projectId: String;
    taskName: String;
    priority: Number;
    parentTask: String;
    startDate: Date;
    endDate: Date;
    assignedUser: String;
}

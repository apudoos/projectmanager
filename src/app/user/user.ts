import { ObjectUnsubscribedError } from 'rxjs';

export interface IUser {
    _id?: string;
    firstName?: string;
    lastName?: string;
    empId?: number;    
    projectId?: string;
    taskId?: string;
}
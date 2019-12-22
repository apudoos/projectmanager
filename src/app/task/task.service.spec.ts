import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import { HttpClientModule } from '@angular/common/http';
import { Task } from './task';
import { of, throwError } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TaskService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy  };
  let taskService: TaskService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    taskService = new TaskService(<any> httpClientSpy);
        
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
        ],
      providers: [
        TaskService, UserService
      ]
    })
  });


  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should return the stub value when #getTask is called', () => {
    //const stubValue = 'stub value';
    const mockTaskData: Task[] = [
        {"_id":"1001",
         "projectId":"1002",
         "taskName":"Task for Third Project",
         "priority":4,
         "parentTaskId":"5d801f172fe3a74f98adcc54",
         "startDate":new Date("2019-09-25T00:00:00.000Z"),
         "endDate":new Date("2020-01-30T00:00:00.000Z"),
         "status":"started"
        } 
    ]
    httpClientSpy.get.and.returnValue(of(mockTaskData));
    taskService.getTasks().subscribe(
      task => expect(task).toEqual(mockTaskData, 'expected Tasks'), 
      fail
    );
  });

  it('should return the stub value when #getTask is called', () => {
    //const stubValue = 'stub value';
    const mockTaskData: Task = 
        {"_id":"1001",
         "projectId":"1002",
         "taskName":"Task for Third Project",
         "priority":4,
         "parentTaskId":"5d801f172fe3a74f98adcc54",
         "startDate":new Date("2019-09-25T00:00:00.000Z"),
         "endDate":new Date("2020-01-30T00:00:00.000Z"),
         "status":"started"
        } 
    
    httpClientSpy.get.and.returnValue(of(mockTaskData));
    taskService.getTasksById("1001").subscribe(
      task => expect(task).toEqual(mockTaskData, 'expected Tasks'), 
      fail
    );
  });

  it('should return the stub value when #postTask is called', () => {
    //const stubValue = 'stub value';
    const mockTaskData: Task = 
    {
      "_id":"1001",
       "projectId":"1002",
       "taskName":"Task for Third Project",
       "priority":4,
       "parentTaskId":"5d801f172fe3a74f98adcc54",
       "startDate":new Date("2019-09-25T00:00:00.000Z"),
       "endDate":new Date("2020-01-30T00:00:00.000Z"),
       "status":"started"
    }   
    const postMockTaskData: Task = 
    {
      "_id":"1001",
       "projectId":"1002",
       "taskName":"Task for Third Project",
       "priority":4,
       "parentTaskId":"5d801f172fe3a74f98adcc54",
       "startDate":new Date("2019-09-25T00:00:00.000Z"),
       "endDate":new Date("2020-01-30T00:00:00.000Z"),
       "status":"started"
    }
    
    httpClientSpy.post.and.returnValue(of(mockTaskData));
    taskService.postTasks(postMockTaskData).subscribe(
      task => expect(task).toEqual(mockTaskData, 'expected Tasks'), 
      fail
    );
  });

  it('should return the stub value when #putTask is called', () => {
    //const stubValue = 'stub value';
    const mockTaskData: Task = 
    {
      "_id":"1001",
       "projectId":"1002",
       "taskName":"Task for Third Project",
       "priority":4,
       "parentTaskId":"5d801f172fe3a74f98adcc54",
       "startDate":new Date("2019-09-25T00:00:00.000Z"),
       "endDate":new Date("2020-01-30T00:00:00.000Z"),
       "status":"started"
    }   
    const putMockTaskData: Task = 
    {
      "_id":"1001",
       "projectId":"1002",
       "taskName":"Task for Third Project",
       "priority":4,
       "parentTaskId":"5d801f172fe3a74f98adcc54",
       "startDate":new Date("2019-09-25T00:00:00.000Z"),
       "endDate":new Date("2020-01-30T00:00:00.000Z"),
       "status":"started"
    }
    
    httpClientSpy.put.and.returnValue(of(mockTaskData));
    taskService.putTask(putMockTaskData).subscribe(
      task => expect(task).toEqual(mockTaskData, 'expected Tasks'), 
      fail
    );

  });

  it('should execute #handleError correctly on error', () => {

    const mockTaskData: Task = 
    {
      "_id":"1001",
       "projectId":"1002",
       "taskName":"Task for Third Project",
       "priority":4,
       "parentTaskId":"5d801f172fe3a74f98adcc54",
       "startDate":new Date("2019-09-25T00:00:00.000Z"),
       "endDate":new Date("2020-01-30T00:00:00.000Z"),
       "status":"started"
    }   
    const putMockTaskData: Task = 
    {
      "_id":"1001",
       "projectId":"1002",
       "taskName":"Task for Third Project",
       "priority":4,
       "parentTaskId":"5d801f172fe3a74f98adcc54",
       "startDate":new Date("2019-09-25T00:00:00.000Z"),
       "endDate":new Date("2020-01-30T00:00:00.000Z"),
       "status":"started"
    }
  
    httpClientSpy.put.and.returnValue(throwError('error'));
  
    taskService.putTask(putMockTaskData).subscribe(
      task => expect(task).toEqual(mockTaskData, 'expected Users'),
      fail => {
        expect(taskService.handleError).toHaveBeenCalled();
      }
    );
  

  });


});

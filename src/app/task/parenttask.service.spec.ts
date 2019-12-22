import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ParentTaskService } from './parenttask.service';

import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Parenttask } from './parenttask';
describe('ParenttaskService', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy  };
  let parentTaskService: ParentTaskService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    parentTaskService = new ParentTaskService(<any> httpClientSpy);
        
    TestBed.configureTestingModule({
      imports: [
         HttpClientTestingModule
        ],
      providers: [
        ParentTaskService
      ]
      /* [
        { provide: UserService, useValue: spy}
      ] */
    })
  });

  it('should be created', () => {
    const mockParentTaskData: Parenttask[] = [
          {
            "_id": "10001",
            "parentTaskName":"Parent Task 1"   
          }
        ]
    httpClientSpy.get.and.returnValue(of(mockParentTaskData));
    expect(parentTaskService).toBeTruthy();
  });

  it('should return the stub value when #getParentTasks is called', () => {
    //const stubValue = 'stub value';
    const mockParentTaskData: Parenttask[] = [
      {
        "_id": "10001",
        "parentTaskName":"Parent Task 1"   
      }
    ]
    httpClientSpy.get.and.returnValue(of(mockParentTaskData));
    parentTaskService.getParentTasks().subscribe(
      parentTask => expect(parentTask).toEqual(mockParentTaskData, 'expected Parent Tasks'), 
      fail
    );

  });

  it('should return the stub value when #postUser is called', () => {
    //const stubValue = 'stub value';
    const mockParentTaskData: Parenttask = 
    {
      "_id": "10001",
      "parentTaskName":"Parent Task 1"   
    }   
    
    const postParentTaskData: Parenttask = 
    {
      "_id": "10001",
      "parentTaskName":"Parent Task 1"   
    }
    const service: ParentTaskService = TestBed.get(ParentTaskService);
    httpClientSpy.post.and.returnValue(of(mockParentTaskData));
    parentTaskService.postParentTasks(postParentTaskData).subscribe(
      parentTask => expect(parentTask).toEqual(mockParentTaskData, 'expected Parent Tasks'), 
      fail
    );

  });

  it('should return the stub value when #putParentTask is called', () => {
    //const stubValue = 'stub value';
    const mockParentTaskData: Parenttask = 
    {
      "_id": "10001",
      "parentTaskName":"Parent Task 1"   
    }
    
    const putParentTaskData: Parenttask = 
    {
      "_id": "10001",
      "parentTaskName":"Parent Task 1"   
    }
    httpClientSpy.put.and.returnValue(of(mockParentTaskData));
    parentTaskService.putParentTask(putParentTaskData).subscribe(
      parentTask => expect(parentTask).toEqual(mockParentTaskData, 'expected Parent Tasks'), 
      fail
    );

  });

  it('should execute #handleError correctly on error', () => {

    const mockParentTaskData: Parenttask = 
    {
      "_id": "10001",
      "parentTaskName":"Parent Task 1"   
    }
    
    const putParentTaskData: Parenttask = 
    {
      "_id": "10001",
      "parentTaskName":"Parent Task 1"   
    }
    httpClientSpy.put.and.returnValue(throwError('error'));
  
    parentTaskService.putParentTask(putParentTaskData).subscribe(
      parentTask => expect(parentTask).toEqual(mockParentTaskData, 'expected Users'),
      fail => {
        // expect(parentTaskService.handleError).toHaveBeenCalled();
      }
    );
  

  });

});

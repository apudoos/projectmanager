import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { IUser } from './user';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  //let userServiceSpy: jasmine.SpyObj<UserService>;
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy  };
  let userService: UserService;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    userService = new UserService(<any> httpClientSpy);
    /* userService.getUsers = jasmine.createSpy().and.returnValue(of([{
      "_id": "10001",
      "firstName": "Mark",
      "lastName": "Johnson",
      "empId": 9999999,
      "projectId": "1001",
      "taskId": "1001"   
    }])); */
    
    TestBed.configureTestingModule({
      imports: [
          HttpClientTestingModule
        ],
      providers: [
        UserService
      ]
      /* [
        { provide: UserService, useValue: spy}
      ] */
    })
    //userServiceSpy = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should return the stub value when #getUser is called', () => {
    //const stubValue = 'stub value';
    const mockUserData: IUser[] = [
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    ]
    httpClientSpy.get.and.returnValue(of(mockUserData));
    userService.getUsers().subscribe(
      users => expect(users).toEqual(mockUserData, 'expected Users'), 
      fail
    );

  });

  it('should return the stub value when #postUser is called', () => {
    //const stubValue = 'stub value';
    const mockUserData: IUser = 
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    
    const postUserData: IUser = 
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    
    httpClientSpy.post.and.returnValue(of(mockUserData));
    userService.postUsers(postUserData).subscribe(
      users => expect(users).toEqual(mockUserData, 'expected Users'), 
      fail
    );

  });

  it('should return the stub value when #putUser is called', () => {
    //const stubValue = 'stub value';
    const mockUserData: IUser = 
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    
    const putUserData: IUser = 
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    
    httpClientSpy.put.and.returnValue(of(mockUserData));
    userService.putUsers(putUserData).subscribe(
      users => expect(users).toEqual(mockUserData, 'expected Users'), 
      fail
    );

  });

  it('should return the stub value when #deleteUser is called', () => {
    //const stubValue = 'stub value';
    const mockUserData: IUser = 
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    
    const deleteUserData: IUser = 
      {
        "_id": "10001",
        "firstName": "Mark",
        "lastName": "Johnson",
        "empId": 9999999,
        "projectId": "1001",
        "taskId": "1001"   
      }
    
    httpClientSpy.delete.and.returnValue(of(mockUserData));
    userService.deleteUser(deleteUserData).subscribe(
      users => expect(users).toEqual(mockUserData, 'expected Users'), 
      fail
    );

  });

  it('should execute #handleError correctly on error', () => {
    const mockUserData: IUser = 
    {
      "_id": "10001",
      "firstName": "Mark",
      "lastName": "Johnson",
      "empId": 9999999,
      "projectId": "1001",
      "taskId": "1001"   
    }
  
  const deleteUserData: IUser = 
    {
      "_id": "10001",
      "firstName": "Mark",
      "lastName": "Johnson",
      "empId": 9999999,
      "projectId": "1001",
      "taskId": "1001"   
    }
  
  httpClientSpy.delete.and.returnValue(throwError('error'));
  userService.deleteUser(deleteUserData).subscribe(
    users => expect(users).toEqual(mockUserData, 'expected Users'),
    fail => {
      // expect(userService.handleError).toHaveBeenCalled();
    }
  );


  });



});

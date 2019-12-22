import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { IUser } from './user';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { ProjectComponent } from '../project/project.component';
import { TaskComponent } from '../task/task.component';
import { ViewTaskComponent } from '../view-task/view-task.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SortviewtaskPipe } from '../view-task/sortviewtask.pipe';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from './user.service';
import { of } from 'rxjs';

const mockUserData = [
  {
    "_id": "10001",
    "firstName": "Mark",
    "lastName": "Johnson",
    "empId": 9999999,
    "projectId": "1001",
    "taskId": "1001"   
  },
  {
    "_id": "10002",
    "firstName": "Jim",
    "lastName": "Thomas",
    "empId": 123321,
    "projectId": "1001",
    "taskId": "1002"   
  },
  {
    "_id": "10003",
    "firstName": "Bob",
    "lastName": "Reid",
    "empId": 123421,
    "projectId": "1002",
    "taskId": "1001"   
  },
  {
    "_id": "10004",
    "firstName": "Jem",
    "lastName": "david",
    "empId": 11345,
    "projectId": "1003",
    "taskId": "1002"   
  },
  {
    "_id": "10001",
    "firstName": "Danny",
    "lastName": "Jo",
    "empId": 435431,
    "projectId": "1001",
    "taskId": "1001"   
  },
  {
    "_id": "10005",
    "firstName": "James",
    "lastName": "Bone",
    "empId": 3322443,
    "projectId": "1001",
    "taskId": "1002"   
  },
  {
    "_id": "10006",
    "firstName": "Taylor",
    "lastName": "Boyd",
    "empId": 443322,
    "projectId": "1005",
    "taskId": "1001"   
  }  
] as IUser[];

describe('UserComponent', () => {
  let userComp: UserComponent;
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,    
        WelcomeComponent,
        ProjectComponent,
        UserComponent,
        TaskComponent,
        ViewTaskComponent,
        PageNotFoundComponent,
        SortviewtaskPipe
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
      providers: [{
        provide: UserService,
      }]
    }).compileComponents();
  }));
    
  it('should create', () => {
    let userService: UserService;
    //fixture = TestBed.createComponent(UserComponent);
    let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy  };
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    userService = new UserService(<any> httpClientSpy);
    
    userService.getUsers = jasmine.createSpy().and.returnValue(of([{
      "_id": "10001",
      "firstName": "Mark",
      "lastName": "Johnson",
      "empId": 9999999,
      "projectId": "1001",
      "taskId": "1001"   
    }]));
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
/*   it('should sort the userList by employee id', () => {
    //const fixture = TestBed.createComponent(UserComponent);
    //const app = fixture.debugElement.componentInstance;
    userComp.sortByEmpId();
    expect(userComp.userList[0].empId).not.toBe(mockUserData[0].empId);
  }); */

  it('fetch user data', () => {
    let userService: UserService;
    //fixture = TestBed.createComponent(UserComponent);
    let httpClientSpy: { getUsers: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy, delete: jasmine.Spy  };
    httpClientSpy = jasmine.createSpyObj('UserService', ['getUsers', 'post', 'put', 'delete']);

    const data = [{
      "_id": "10001",
      "firstName": "Mark",
      "lastName": "Johnson",
      "empId": 9999999,
      "projectId": "1001",
      "taskId": "1001"   
    }];
    httpClientSpy.getUsers.and.returnValue(of(data))
    const fixture = TestBed.createComponent(UserComponent);
  
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();

    expect(app.userList).toEqual(data);
  });
});

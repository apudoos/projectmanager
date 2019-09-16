import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from './task';
import { IProject } from '../project/project';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user';
import { Parenttask } from './parenttask';
import { TaskService } from './task.service';
import { ParentTaskService } from './parenttask.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskAddForm: FormGroup;
  newTask = new Task();
  projectList : IProject[] = [];
  userList: IUser[] = [];
  updateUser: IUser = {};
  project: IProject = {};
  errorMessage: string = '';
  projectName: string = '';
  userName: string = '';
  userId: Number = 0;
  newParentTask = new Parenttask();
  parentTaskList : Parenttask[] = [];

  constructor(private fb: FormBuilder, 
              private projectService: ProjectService,
              private taskService: TaskService,
              private parentTaskService: ParentTaskService,
              private userService: UserService) { }

  ngOnInit() {
    this.taskAddForm = this.fb.group({
      projectName: [{value: '', disabled: true},],
      taskName: ['', [Validators.required]],
      isParentTask: false,
      priority: '',
      parentTask:[{value: '', disabled: true},],
      startDate: '',
      endDate: '',
      userName: [{value: '', disabled: true}]
    });

    this.fetchProjectData();
    this.fetchUserData();
    this.fetchParentTaskData();

    this.taskAddForm.get('isParentTask').valueChanges.subscribe(v => {
      if (v) {
        this.taskAddForm.get('priority').disable();
        this.taskAddForm.get('parentTask').disable();
        this.taskAddForm.get('startDate').disable();
        this.taskAddForm.get('endDate').disable();        
      } else {
        this.taskAddForm.get('priority').enable();
        this.taskAddForm.get('parentTask').enable();
        this.taskAddForm.get('startDate').enable();
        this.taskAddForm.get('endDate').enable();
      }
    })

   /* old way 
      this.viewForm = new FormGroup({
      projectName: new FormControl(),
      taskName: new FormControl(),
      isParentTask: new FormControl(false),
      priority: new FormControl(),
      parentTask: new FormControl(),
      startDate: new FormControl(),
      endDate: new FormControl(),
      user: new FormControl()
    }); */
  }


  fetchProjectData() {
    this.projectService.getProjects().subscribe(
      projects => this.projectList = projects,
      error => this.errorMessage = <any>error
    );
  }

  onProjectSearchSelect(project: IProject) {
    console.log(`project details ${project._id} ${project.projectName}`);
    
    this.newTask.projectId = project._id;
    this.projectName= project.projectName;
    this.taskAddForm.patchValue({projectName: this.projectName});
  }

  fetchUserData() {
    this.userService.getUsers().subscribe(
      users => {
        this.userList = users;
      },
      error => this.errorMessage = <any>error
    );
  }

  onUserSearchSelect(user: IUser) {
    //this.newTask.assignedUser = user.empId;
    this.userName= user.firstName + ' ' + user.lastName;
    this.updateUser=user;
    this.taskAddForm.patchValue({userName: this.userName});
  }

  fetchParentTaskData() {
    this.parentTaskService.getParentTasks().subscribe(
      parentTask => this.parentTaskList = parentTask,
      error => this.errorMessage = <any>error
    );
  }

  onParentTaskSearchSelect(parentTask: Parenttask) {
    
    this.newTask.parentTaskId = parentTask._id;
    this.taskAddForm.patchValue({parentTask: parentTask.parentTaskName});
  }

  onSubmit() {
    //console.log(this.taskAddForm);
    console.log('On submit clicked');

    if (this.taskAddForm.get('isParentTask').value) {
      this.newParentTask.parentTaskName = this.taskAddForm.get('taskName').value;
      this.parentTaskService.postParentTasks(this.newParentTask).subscribe();
      console.log(this.newParentTask.parentTaskName);
    } else {
      this.newTask.taskName = this.taskAddForm.get('taskName').value;
      this.newTask.priority = this.taskAddForm.get('priority').value;
      this.newTask.startDate = this.taskAddForm.get('startDate').value;
      this.newTask.endDate = this.taskAddForm.get('endDate').value;
      this.newTask.parentTaskId = this.taskAddForm.get('parentTask').value;  
      this.newTask.status = "Started";
      this.updateUser.projectId = this.newTask.projectId;
      //insert the new task in db
      this.taskService.postTasks(this.newTask).subscribe(task => {
        this.updateUser.taskId = task._id,
        this.userService.putUsers(this.updateUser).subscribe();
      });
      console.log('Task Added');
    }



  }

  /* Instead of giving taskAddForm.get('taskName') in html you could define a getter like this

  get taskName() { return this.taskAddForm.get('taskName'); } */


}

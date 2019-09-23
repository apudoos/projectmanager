import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Task } from './task';
import { IProject } from '../project/project';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user';
import { Parenttask } from './parenttask';
import { TaskService } from './task.service';
import { ParentTaskService } from './parenttask.service';
import { ActivatedRoute } from '@angular/router';

function validateData(c: AbstractControl): { [key: string] : boolean } | null 
{
  if (c.value !=null ) {
    return {'valid': true};
  } 
  return null;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  taskAddForm: FormGroup;
  newTask: Task | undefined;
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
  disableUserSearch : Boolean = false;
  disableParentTaskSearch : Boolean = false;
  disableProjectSearch: Boolean = false;
  buttonValue: string = "Add";

  constructor(private fb: FormBuilder, 
              private projectService: ProjectService,
              private taskService: TaskService,
              private parentTaskService: ParentTaskService,
              private userService: UserService,
              private route: ActivatedRoute ) {this.newTask = {} }

  ngOnInit() {
    
    this.taskAddForm = this.fb.group({
      projectName: ['',[Validators.required]],
      taskName: ['', [Validators.required]],
      isParentTask: false,
      priority: [0, [Validators.required]],
      parentTask:['', [Validators.required]],
      startDate: '',
      endDate: '',
      userName: ['', [Validators.required]]
    });

    this.fetchProjectData();
    this.fetchUserData();
    this.fetchParentTaskData();

    this.taskAddForm.get('isParentTask').valueChanges.subscribe(v => {
      if (v) {
        this.taskAddForm.get('parentTask').clearValidators();
        this.taskAddForm.get('userName').clearValidators();
        this.taskAddForm.get('priority').disable();
        this.taskAddForm.get('parentTask').disable();
        this.taskAddForm.get('startDate').disable();
        this.taskAddForm.get('endDate').disable();    
        this.disableUserSearch = true;
        this.disableParentTaskSearch = true;
        this.taskAddForm.updateValueAndValidity();

      } else {     
        if (this.taskAddForm.get('isParentTask').enabled) {
          this.taskAddForm.get('parentTask').setValidators([Validators.required]);
          this.taskAddForm.get('userName').setValidators([Validators.required]);
          this.taskAddForm.get('priority').enable();
          this.taskAddForm.get('parentTask').enable();
          this.taskAddForm.get('startDate').enable();
          this.taskAddForm.get('endDate').enable();
          this.disableUserSearch = false;
          this.disableParentTaskSearch = false;
          this.disableProjectSearch = false;
        }
      }
    })

    let id  = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        this.getTasksById(id);
      }
    )
  }

  getTasksById(id: string) {
    this.taskService.getTasksById(id).subscribe(
      tasks => this.taskRetreived(tasks, id),
      error => this.errorMessage = <any>error
    )
  }

  taskRetreived(task: Task, id:string) {
    console.log('Inside taskRetreived');
    if (this.taskAddForm) {
      this.taskAddForm.reset();
    }
    console.log(task[0]);
    this.newTask._id = task[0]._id;
    this.newTask.projectId = task[0].projectId;
    this.newTask.taskName = task[0].taskName;
    this.newTask.parentTaskId = task[0].parentTaskId;
    this.newTask.startDate = task[0].startDate;
    this.newTask.priority = task[0].priority;
    this.newTask.endDate = task[0].endDate;
    this.newTask.status = task[0].status; 

    console.log(task);
    console.log(this.newTask);
    
    
    if (id) {
      this.buttonValue = "Update"
    } else {
      this.buttonValue = "Add"
    }


    if(this.newTask._id.length) {
      
      this.newTask.projectName = this.projectList.find(project => {
        console.log(project._id);
        console.log(this.newTask.projectId);
        return project._id === this.newTask.projectId;
      }).projectName;
      console.log('Inside second if condition');
      if (this.newTask.parentTaskId) {
        this.newTask.parentTaskName = this.parentTaskList.find(parent => {
          return parent._id === this.newTask.parentTaskId
        }).parentTaskName;

        let tempUser = this.userList.find(user => {
          console.log(user.taskId);
          console.log(this.newTask._id);
          return user.taskId === this.newTask._id
        });
        if (tempUser) {
          this.newTask.userName = tempUser.firstName.concat(' ', tempUser.lastName);
        }
      }
      this.taskAddForm.get('projectName').clearValidators();
      this.taskAddForm.get('parentTask').clearValidators();
      this.taskAddForm.get('userName').clearValidators();
      this.taskAddForm.get('projectName').disable();
      this.taskAddForm.get('parentTask').disable();      
      this.taskAddForm.get('userName').disable();
      this.taskAddForm.get('isParentTask').disable();
      this.disableUserSearch = false;
      this.disableParentTaskSearch = true;
      this.disableProjectSearch = true;
    }

    console.log(this.newTask);
    
    this.taskAddForm.patchValue({
      projectName: this.newTask.projectName,
      taskName: this.newTask.taskName,
      isParentTask: false,
      priority: this.newTask.priority,
      parentTask: this.newTask.parentTaskName,
      startDate: new Date(this.newTask.startDate).toISOString().substring(0,10),
      endDate: new Date(this.newTask.endDate).toISOString().substring(0,10),
      userName: this.newTask.userName
    });

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
    console.log(this.taskAddForm);
    console.log('On submit clicked');

    if (this.taskAddForm.get('isParentTask').value) {
      this.newParentTask.parentTaskName = this.taskAddForm.get('taskName').value;
      this.parentTaskService.postParentTasks(this.newParentTask).subscribe(
        parentTask => this.parentTaskList.push(parentTask)
      );
      console.log(this.newParentTask.parentTaskName);
    } else {
      
      this.newTask.taskName = this.taskAddForm.get('taskName').value;
      this.newTask.priority = this.taskAddForm.get('priority').value;
      this.newTask.startDate = this.taskAddForm.get('startDate').value;
      this.newTask.endDate = this.taskAddForm.get('endDate').value;      
      this.newTask.status = "Started";
      this.updateUser.projectId = this.newTask.projectId;

      if (!this.newTask.startDate) {
        this.newTask.startDate = new Date();
        this.newTask.endDate.setDate(this.newTask.startDate.getDate() + 1);
      }

      //insert the new task in db
      if (this.buttonValue === "Add") {
        this.taskService.postTasks(this.newTask).subscribe(task => {
          this.updateUser.taskId = task._id,
            this.updateUser.projectId = task.projectId,
            this.userService.putUsers(this.updateUser).subscribe(user =>
              console.log("user updated")
            );
        });
        console.log('Task Added');
      } else {
        console.log("inside update");
        this.taskService.putTask(this.newTask).subscribe(task => {
          this.updateUser.taskId = task._id,
            this.updateUser.projectId = task.projectId,
            this.userService.putUsers(this.updateUser).subscribe(user =>
              console.log("user updated")
            );
        });
      }
    }

    this.taskAddForm.reset();
  }

  /* Instead of giving taskAddForm.get('taskName') in html you could define a getter like this

  get taskName() { return this.taskAddForm.get('taskName'); } */


}

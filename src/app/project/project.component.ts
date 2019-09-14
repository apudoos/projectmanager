import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgForm  } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IProject } from './project';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user';
import { ProjectService } from './project.service';
import { IProjectTask } from './projecttask';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  newProject: IProject;
  projectList: IProject[] = [];
  //tempList: IProjectTask[] = [];
  filteredList: IProjectTask[] = [];
  errorMessage = '';
  managerName = '';
  userList: IUser[] = [];
  filteredUserList: IUser[] = [];
  _listFilter = '';
  buttonName: String = 'Add';
  isChecked: boolean = false;

  constructor(
    private datePipe: DatePipe, 
    private projectService: ProjectService,
    private userService: UserService) 
    { 
      this.newProject = {};   
  }

  fetchTaskData() {

  }

  get listFilter(): string {
    return this._listFilter;
  }
  
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredList = this._listFilter ? this.performFilter(this.listFilter) : this.projectList;
  }

  performFilter(filterBy: string): IProject[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.projectList.filter((project: IProject) =>
                  (project.projectName.toLocaleLowerCase().indexOf(filterBy) !== -1));
  }

  fetchProjectData() {
    let i = 0;
    this.projectService.getProjects().subscribe(
      projects => {
        this.projectList = projects;
        this.filteredList = this.projectList;
 
        this.filteredList.forEach(x => {
          if (x.endDate <= new Date()) {
            x.completed = "Y"
          } else {
            x.completed = "N"
          }
          x.taskCount = 2;
        })

      },
      error => this.errorMessage = <any>error
    );
  }

  fetchUserData() {
    this.userService.getUsers().subscribe(
      users => {
        this.userList = users;
        this.filteredUserList = this.userList;
      },
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
    this.fetchTaskData();
    this.fetchProjectData(); 
    this.fetchUserData();
    this.newProject.priority = 0;
  }

  onSearchSelect(user: IUser) {
    this.newProject.managerId = user.empId;
    this.managerName = user.firstName + " " + user.lastName;
  }


  saveProject(projectForm: NgForm) {
    console.log(`New project details: ${this.newProject}`);
 
    if (!this.newProject.startDate) {
      this.newProject.startDate = new Date();
      this.newProject.endDate = new Date();
      this.newProject.endDate.setDate(this.newProject.endDate.getDate() + 1);
    }

    if (this.buttonName === 'Add') {
      this.projectService.postProjects(this.newProject).subscribe(project => this.projectList.push(project));
      this.newProject = {};
      console.log('User Added');
    }
    else {
      
      this.projectService.putProjects(this.newProject).subscribe(returnedProject => {
        let projectIndex = this.projectList.findIndex(tempProject => tempProject._id == returnedProject._id);
        this.projectList[projectIndex] =  returnedProject;
        console.log('User Updated');
      });
      
      this.projectService.putProjects
    } 
      projectForm.resetForm();
      this.buttonName='Add'; 

  }

  sortByStartDate() {
    this.filteredList.sort((a: IProjectTask, b: IProjectTask) => {
      return +new Date(a.startDate) - +new Date(b.startDate);
    });
  }

  sortByEndDate() {
    this.filteredList.sort((a: IProjectTask, b: IProjectTask) => {
      return +new Date(a.endDate) - +new Date(b.endDate);
    });
  }

  sortByPriority() {
    this.filteredList.sort((a: IProjectTask, b: IProjectTask) => {
      return a.priority - b.priority;
    });
  }

  sortByCompleted() {
    this.filteredList.sort((a: IProjectTask, b: IProjectTask) => {
      return a.completed.toLocaleLowerCase().localeCompare(b.completed.toLocaleLowerCase());
    });
  }


  updateProject(project: IProjectTask, className: String) {
    
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });

    this.isChecked = true;
    this.newProject = project; 
    console.log(this.newProject); 
    var filterBy:number = this.newProject.managerId;  
    var tempUser:IUser[] = this.userList.filter(user => user.empId === filterBy);
    this.managerName = tempUser[0].firstName + " " + tempUser[0].lastName
    this.buttonName='Update';
  }

  suspendProject() {

  }

}

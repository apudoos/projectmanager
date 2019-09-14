import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Task } from './task';
import { IProject } from '../project/project';
import { ProjectComponent } from '../project/project.component';
import { ProjectService } from '../project/project.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  viewForm: FormGroup;
  task = new Task();
  projectList : IProject[] = [];
  project: IProject = {};
  errorMessage: String = '';

  constructor(private fb: FormBuilder, private projectService: ProjectService) { }

  ngOnInit() {
    this.viewForm = this.fb.group({
      projectName: [{value:'', disabled: true},[Validators.required]],
      taskName: '',
      isParentTask: false,
      priority: '',
      parentTask:'',
      startDate: '',
      endDate: '',
      user: ''
    });

    this.fetchProjectData();
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
    let i = 0;
    this.projectService.getProjects().subscribe(
      projects => this.projectList = projects,
      error => this.errorMessage = <any>error
    );
  }

  onSearchSelect(project: IProject) {
    this.project._id = project._id;
    this.project.projectName= project.projectName;
  }

  onSubmit() {
    console.log('On submit clicked');
  }

}

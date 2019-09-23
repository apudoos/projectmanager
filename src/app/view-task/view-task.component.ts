import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task/task.service';
import { ProjectService } from '../project/project.service';
import { ParentTaskService } from '../task/parenttask.service';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY, combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  searchString: string = '';
  sortBy: string = '';

  //Register a subject
  private searchStringSubject = new Subject<string>();
  //expose the observable
  searchStringAction$ = this.searchStringSubject.asObservable();

  projectList$ = this.projectService.project$.pipe(
    catchError(err=> {
      return EMPTY;
    })
  );

  taskList$ = this.taskService.taskList$.pipe(
    catchError(err=> {
      return EMPTY;
    })
  );

  parentTaskList$ = this.parentTaskService.parentTaskList$.pipe(
    catchError(err=> {
      return EMPTY;
    })
  );

  combinedTask$ = combineLatest([
    this.projectList$,
    this.taskList$,
    this.parentTaskList$,
    this.searchStringAction$
  ]).pipe(
    map(([projectList, taskList, parentList, searchString]) => {
      taskList.map(task => {
        task.projectName = projectList.find(c => (task.projectId === c._id)).projectName;
        task.parentTaskName = parentList.find(d => task.parentTaskId === d._id) 
                                                                  ? parentList.find(d => task.parentTaskId === d._id).parentTaskName
                                                                  :'This Task has not parent'
      });
      taskList = taskList.filter(x => x.projectName.toLocaleLowerCase().indexOf(searchString.toLocaleLowerCase()) !== -1);
      
      return taskList;

      /* ({
        ...task,
        projectName: projectList.find(c => (task.projectId === c._id)).projectName,
        //parentTaskName: parentList.find(d => task.parentTaskId === d._id)?parentList.find(d => task.parentTaskId === d._id).parentTaskName:'This Task has not parent'
      }) as Task) */
    })
  )

  constructor(private taskService: TaskService,
              private projectService: ProjectService,
              private parentTaskService: ParentTaskService) { }

  ngOnInit() {
    //this.fetchProjectData();
    //this.fetchParentTaskData();
    //this.fetchTaskData();
  }

  /* fetchProjectData() {
    this.projectService.getProjects().subscribe(
      projects => this.projectList = projects,
      error => this.errorMessage = <any>error
    );
  }

  fetchTaskData() {
    this.taskService.getTasks().subscribe(
      task => this.taskList = task,
      error => this.errorMessage = <any>error
    );
  }

  fetchParentTaskData() {
    this.parentTaskService.getParentTasks().subscribe(
      parentTask => this.parentTaskList = parentTask,
      error => this.errorMessage = <any>error
    );
  } */

  searchProject() {
    this.searchStringSubject.next(this.searchString);
    console.log(this.searchString);
  }

  sortByStartDate() {
    this.sortBy = "StartDate";
    console.log(this.sortBy);
  }

  sortByEndDate() {
    this.sortBy = "EndDate";
    console.log(this.sortBy);
  }

  sortByPriority() {
    this.sortBy = "Priority";
    console.log(this.sortBy);
  }

  sortByCompleted() {
    this.sortBy = "Completed";
    console.log(this.sortBy);
  }
  /* searchProject() {
    let tempParentTask : Parenttask[] = [];
    let tempParentTaskDetails: string[];

    this.viewTaskList = [];

    this.filteredProjectList = this.projectList.filter(project => {
      return (project.projectName.toLocaleLowerCase().indexOf(this.searchString.toLocaleLowerCase()) !== -1);
    });

   this.filteredProjectList.forEach(project => {
      this.filteredTaskList = this.filteredTaskList.concat(this.taskList.filter((task: Task) => {
        return (task.projectId == project._id)}));
    });

    for (var i=0; i< this.filteredTaskList.length; i++) {
      tempParentTask = this.parentTaskList.filter(parentTask => {
        return parentTask._id == this.filteredTaskList[i].parentTaskId;
      });

      tempParentTaskDetails = tempParentTask.map(parent => {
        return parent.parentTaskName;
      })

      this.viewTaskList.push({
        projectId: this.filteredTaskList[i].projectId,
        taskName: this.filteredTaskList[i].taskName,
        priority: this.filteredTaskList[i].priority,
        parentTask:tempParentTaskDetails[0] ? tempParentTaskDetails[0] : 'This Task Has No Parent',
        startDate: this.filteredTaskList[i].startDate,
        endDate: this.filteredTaskList[i].endDate,
        status: this.filteredTaskList[i].status
        })
 
    }

  } */

}

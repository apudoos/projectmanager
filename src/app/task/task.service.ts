import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Task } from './task';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private url = 'http://localhost:8080/tasks';
  //private url = 'api/tasks/tasks.json';


  constructor(private http: HttpClient) { }

  taskList$ =  this.http.get<Task[]>(this.url).pipe(
    tap(data => console.log('All: ' + JSON.stringify(data))),
    catchError(this.handleError)
  );

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getTasksById(id: string): Observable<Task> {
    if (id) {
      let getByIdUrl = this.url.concat('/', id);
      console.log(getByIdUrl);
      return this.http.get<Task>(getByIdUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
    } else {
      return of(this.initializeTask());
    }
  }


  postTasks(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };    
    console.log(JSON.stringify(task));
    return this.http.post<Task>(this.url, JSON.stringify(task), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  putTask(task: Task): Observable<Task> {
    console.log("Put Task");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }; 
    let localurl = this.url.concat('/',task._id);
    return this.http.put<Task>(localurl, JSON.stringify(task), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  private initializeTask(): Task {
    return {
      _id: '',
      projectId: '',
      projectName: '',
      taskName: '',
      priority: 0,
      parentTaskId: '',
      parentTaskName: '',
      startDate: new Date,
      endDate: new Date,
      status: 'started'
    }
  }


}

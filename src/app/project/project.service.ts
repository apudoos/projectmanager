import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { IProject } from './project';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url = 'http://localhost:8080/projects';
  //private url = 'api/projects/projects.json';
  //private projectPostUrl = 'http://localhost:8080/projects';
  //private projectPutUrl = 'http://localhost:8080/projects';
  //private projectDeleteUrl = 'http://localhost:8080/projects';
  
  constructor(private http: HttpClient ) { }

  getProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postProjects(project: IProject): Observable<IProject> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };    
    console.log(JSON.stringify(project));
    return this.http.post<IProject>(this.url, JSON.stringify(project), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  putProjects(project: IProject): Observable<IProject> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }; 
    let localurl = this.url.concat('/',project._id);
    return this.http.put<IProject>(localurl, JSON.stringify(project), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  deleteProject(project: IProject): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }; 
     
    let url = this.url.concat('/',project._id);
    return this.http.delete(url, httpOptions ).pipe(
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

  
}

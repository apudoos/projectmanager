import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Parenttask } from './parenttask';

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService {
  private url = 'http://localhost:8080/parenttasks';


  constructor(private http: HttpClient) { }

  getTasklist() {
    return this.http.get<Parenttask[]>(this.url).pipe(
    tap(data => console.log('All: ' + JSON.stringify(data))),
    catchError(this.handleError)
  );
  }

  getParentTasks(): Observable<Parenttask[]> {
    return this.http.get<Parenttask[]>(this.url).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postParentTasks(parentTask: Parenttask): Observable<Parenttask> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };    
    console.log(JSON.stringify(parentTask));
    return this.http.post<Parenttask>(this.url, JSON.stringify(parentTask), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  putParentTask(parentTask: Parenttask): Observable<Parenttask> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }; 
    let localurl = this.url.concat('/',parentTask._id);
    return this.http.put<Parenttask>(localurl, JSON.stringify(parentTask), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  public handleError(err: HttpErrorResponse) {
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

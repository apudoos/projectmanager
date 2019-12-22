import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userGetUrl = 'http://localhost:8080/users';
  //private userGetUrl = 'api/users/users.json';
  private userPostUrl = 'http://localhost:8080/users';
  private userPutUrl = 'http://localhost:8080/users';
  private userDeleteUrl = 'http://localhost:8080/users';
  
  constructor(private http: HttpClient, ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.userGetUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postUsers(user: IUser): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };    
    console.log(JSON.stringify(user));
    return this.http.post<IUser>(this.userPostUrl, JSON.stringify(user), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  putUsers(user: IUser): Observable<IUser> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }; 
    let url = this.userPutUrl.concat('/',user._id);
    return this.http.put<IUser>(url, JSON.stringify(user), httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  deleteUser(user: IUser): Observable<{}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }; 
     
    let url = this.userDeleteUrl.concat('/',user._id);
    return this.http.delete(url, httpOptions ).pipe(
          catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
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
    console.error(err);
    return throwError(errorMessage);
  }

}

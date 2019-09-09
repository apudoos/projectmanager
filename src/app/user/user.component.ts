import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: IUser[] = [];
  userList$: Observable<IUser[]>;
  filteredList: IUser[] = [];
  newUser: IUser | undefined;
  errorMessage = '';
  firstName = '';
  lastName = '';
  empId = 0;
  
  _listFilter = '';
  
  get listFilter(): string {
    return this._listFilter;
  }
  
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredList = this.listFilter ? this.performFilter(this.listFilter) : this.userList;
  }

  performFilter(filterBy: string): IUser[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.userList.filter((user: IUser) =>
                  (user.firstName.toLocaleLowerCase().indexOf(filterBy) !== -1)
                  || (user.lastName.toLocaleLowerCase().indexOf(filterBy) !== -1)
                  || (user.empId.toString().toLocaleLowerCase().indexOf(filterBy) !== -1));
  }


  /* get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;    
  } */

 /*  get lastName() {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get empId() {
    return this._empId.toString();
  }

  set empId(value: string) {
    this._empId = +value;
  } */


  constructor(private userService: UserService) { this.newUser = {}}

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUsers().subscribe(
      users => {
        this.userList = users;
        this.filteredList = this.userList;
        console.log("User List" + this.userList);
      },
      error => this.errorMessage = <any>error
    );
  }


  onAddClicked(): void {
    this.newUser.firstName = this.firstName;
    this.newUser.lastName = this.lastName;
    this.newUser.empId = this.empId;

    this.userService.postUsers(this.newUser).subscribe(user => this.userList.push(user));


    this.firstName='';
    this.lastName='';
    this.empId=0;


    console.log('User Added');
  }

  onResetClicked(): void {
    this.firstName='';
    this.lastName='';
    this.empId=0;
  }

  updateUser(user: IUser) {
    this.userService.putUsers(user).subscribe(returnedUser => {
      let userIndex = this.userList.findIndex(tempUser => tempUser.empId == returnedUser.empId);
      this.userList[userIndex] =  returnedUser;
    });
  }

  deleteUser(user: IUser) {
    console.log('User Deleted');
    this.userService.deleteUser(user).subscribe(() => {
      this.fetchUserData();
    });    
  }

  sortByFirstName(): void {
    this.userList.sort((a,b)=> (a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())));
  }

  sortByLastName(): void {
    this.userList.sort((a,b)=> (a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase())));
  }

  sortByEmpId(): void {
    this.userList.sort((a,b)=> a.empId - b.empId);
  }

}

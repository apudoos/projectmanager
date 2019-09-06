import { Component, OnInit } from '@angular/core';
import { IUser } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList: IUser[] = [];
  filteredList: IUser[] = [];
  newUser: IUser | undefined;
  errorMessage = '';
  _firstName = '';
  _lastName = '';
  _empId = 0;

  get firstName() {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;    
  }

  get lastName() {
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
  }


  constructor(private userService: UserService) { this.newUser = {}}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.userList = users;
        this.filteredList = this.userList;
        console.log(this.userList);
      },
      error => this.errorMessage = <any>error
    );
  }

  onAddClicked(): void {
    this.newUser.firstName = this._firstName;
    this.newUser.lastName = this._lastName;
    this.newUser.empId = this._empId;

    this.userService.postUsers(this.newUser).subscribe(user => this.userList.push(user));


    this.firstName='';
    this.lastName='';
    this.empId='';


    console.log('User Added');
  }

  onResetClicked(): void {
    this.firstName='';
    this.lastName='';
    this.empId='';
  }

  updateUser(user: IUser) {
    console.log(`User Updated  ${user.firstName}  ${user.lastName}  ${user.empId}`);
    this.userService.putUsers(user).subscribe(returnedUser => {
      let userIndex = this.userList.findIndex(tempUser => tempUser.empId == returnedUser.empId);
      this.userList[userIndex] =  returnedUser;
    });
  }

  deleteUser(user: IUser) {
    console.log('User Deleted');
  }

}

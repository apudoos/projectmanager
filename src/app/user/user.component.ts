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
  newUser: IUser;
  errorMessage = '';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.userList = users;
        this.filteredList = this.userList;
      },
      error => this.errorMessage = <any>error
    );
  }

  onAddClicked(): void {
    console.log('User Added');
  }

  onResetClicked(): void {
    this.newUser.empId=0;
    this.newUser.firstName="";
    this.newUser.lastName="";
  }

  updateUser(user: IUser) {
    console.log('User Updated');
  }

  deleteUser(user: IUser) {
    console.log('User Deleted');
  }

}

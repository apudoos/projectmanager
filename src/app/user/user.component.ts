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
  newUser: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onAddClicked(): void {
    
  }

  onResetClicked(): void {
    this.newUser.empId=0;
    this.newUser.firstName="";
    this.newUser.lastName="";
  }

}

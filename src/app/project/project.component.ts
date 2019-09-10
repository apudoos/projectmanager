import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IProject } from './project';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  //prjName: string = "";
  project = new IProject();
  today = new Date();
  tomorrow = new Date();  
  isChecked: Boolean = false;
  startDate: string;
  endDate: string;
  priority: number;
  userList: IUser[] = [];
  filteredList: IUser[] = [];
  errorMessage = '';
  managerName = '';

  constructor(private datePipe: DatePipe, private userService: UserService) { 
   
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

  ngOnInit() {
    console.log(this.datePipe.transform(this.today,"yyyy-MM-dd"));
    console.log(this.datePipe.transform(this.tomorrow.setDate(this.tomorrow.getDate() + 1),"yyyy-MM-dd"));
    //this.startDate = this.datePipe.transform(this.today,"yyyy-MM-dd");
    //this.endDate = this.datePipe.transform(this.tomorrow.setDate(this.tomorrow.getDate() + 1),"yyyy-MM-dd");
    this.fetchUserData();
  }

  onSearchSelect(user: IUser) {
    this.project.empId = user.empId;
    this.managerName = user.firstName + " " + user.lastName;
  }


  saveProject() {

  }

  setStartDate() {
    this.startDate = this.datePipe.transform(this.today,"yyyy-MM-dd");
  }

  setEndDate() {
    this.endDate = this.datePipe.transform(this.tomorrow.setDate(this.tomorrow.getDate() + 1),"yyyy-MM-dd");
  }

  changed() {

  }

}

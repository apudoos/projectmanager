import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'projects', component: ProjectComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'viewtasks', component: ViewTaskComponent },
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    ProjectComponent,
    TaskComponent,
    ViewTaskComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

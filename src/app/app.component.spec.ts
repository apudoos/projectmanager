import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SortviewtaskPipe } from './view-task/sortviewtask.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('AppComponent', () => {
  const appRoutes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'users', component: UserComponent },
    { path: 'projects', component: ProjectComponent },
    { path: 'tasks', component: TaskComponent },
    { path: 'tasks/:id', component: TaskComponent },
    { path: 'viewtasks', component: ViewTaskComponent },
    { path: '',
      redirectTo: '/welcome',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
      ],
      declarations: [
        AppComponent,    
        WelcomeComponent,
        UserComponent,
        ProjectComponent,
        TaskComponent,
        ViewTaskComponent,
        PageNotFoundComponent,
        SortviewtaskPipe
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' }
    ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Project Manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.pageTitle).toEqual('Project Manager');
  });

  it('should render menu with first entry as home', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li>a').textContent).toContain('Home');
  });
  it('should render menu with second entry as Add Project', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li>a')[1].textContent).toContain('Add Project');
  });
  it('should render menu with third entry as Add Task', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li>a')[2].textContent).toContain('Add Task');
  });
  it('should render menu with fourth entry as Add User', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li>a')[3].textContent).toContain('Add User');
  });
  it('should render menu with fifth entry as View Task', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('li>a')[4].textContent).toContain('View Tasks');
  });
});

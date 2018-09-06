# TeamAppAngularTutorial
README is still before corrections, so it is possible that have some mistakes. 

## First install Angular CLI
```$ npm install -g @angular/cli```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.6.

## Create angular project from scratch
```$ ng new team-app-angular-tutorial```

## Run application
Go to new application directory and run app: ```$ ng serve```
On page http://localhost:4200 you will see main page of application.

## Some improvements 
### Change main page
Change header to "Welcome to Team App" and add link "My team"

### Create module for My team
Go to src/app directory and run a command:

```$ ng generate module my-team --routing```

The above command generate module and path for routing. Our module will contains: 
- a team list
- form to add the new team

### Create components for team list and form to add new team
Go to my-team directory and run a commands:
- the team list: ```$ ng generate component team-list```
- form to add the new team: ```$ ng generate component new-team```

Above commands added in my-team.module components in declarations and generated sub folders with:
- css 
- html
- component correspondent with html
- test for the component

### Add path for routing and activate link on main page
In file my-team-routing.module.ts add routings path:
```$xslt
const routes: Routes = [
  {
    path: 'team',
    component: TeamListComponent
  },
  {
    path: 'team/new',
    component: NewTeamComponent
  }
];
```

In app.component.html add link to new team list:
```<h2><a routerLink="/team">My team</a></h2>```

Try run application: ```$ ng serve```

You see that link to team doesn't work. Reason is that we forget to add global routing in our app. During 
generate app we should add have command: 

```$ ng new team-app-angular-tutorial --routing```

So now in app directory add file app-routing.module.ts which contains:

```$xslt
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

and import in app.module.ts new routing:
```
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyTeamModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
And finally add in app.component.html line where will be displayed components <router-outlet></router-outlet>

After this operation when you click on link you will see on page "team-list works!" message.

## CREATE SERVICE

### Get all teams
In src/app/my-team create service for requests.
 
Call command which create Injectable service team.service.ts and add HttpClient library.

```$ ng g s team``` 

In file team-list.component.html create table which displayed teams name retrieved from TeamService.
```angular2html
<table>
  <thead>
  <tr>
    <th>Team name</th>
  </tr>
  </thead>
  <tbody>
  <tr *ngFor="let team of teams">
    <td>{{team.name}}</td>
  </tr>
  </tbody>
</table>
```

In my-team.module.ts in section Providers add new service TeamService and in app.module.ts in imports add HttpClientModule. 

### Create a new team
Now is time to create form where we can add a new team. 

To team.service.ts add a function to add a team which will call POST method.

```angular2html
  create(team: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, team);
  }
```

In app.component.html add link to page with the new team form.

```angular2html
  <li>
    <a routerLink="/team/new">New team</a>
  </li>
```

In new-team.component.ts add variable for data binding: ```team: any = {};```
It's important to initialize empty object. Without that you will see error in browser console. 

In new-team.component.html add input for team name and button to save data.
But before that you have to add in imports section extra module "FormsModule" in class my-team.module.ts. 
```angular2html
<div>
  <label>Team name:
    <input [(ngModel)]="team.name" id="teamName" name="teamName">
  </label>
</div>
```  
Now in the corespondent component (new-team.component.ts) add function create() which call function create(object: any) from service TeamService. 
```angular2html
  create() { }
```
and on the page add Save button. After some changes html should look like:
```angular2html
<div>
  <form>
    <label>Team name:
      <input [(ngModel)]="team.name" id="teamName" name="teamName">
    </label>
    <button type="button" (click)="create()">Add</button>
  </form>
</div>
```

To save data you must inject TeamService into NewTeamComponent and call function create.
To inject service use constructor:
```angular2html
  constructor(private teamService: TeamService) {
  }
```
and after that in NewTeamComponent change implementation of function create():
```angular2html
  create() {
    this.teamService.create(this.team).subscribe(result => {
        this.team = {};
      },
      error1 => {
        console.log(error1);
      }
    );
  }
```
  

## ADD BOOTSTRAP CSS
The easiest way is just add in index.html link to css: 
```angular2html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
``` 
otherwise we can import css by added in style.css line of code, but for that we must install package by npm first ($ npm install --save bootstrap font-awesome) - it's out of scope of this tutorial. 
```angular2html
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~font-awesome/css/font-awesome.css";
```

Now is time to add some classes to our html elements :)
- for button: class="btn btn-success"
- for table element: class="table table-dark"
- new implementation for app.component.html:
```angular2html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" routerLink="/team">My team</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" routerLink="/team/new">New team</a>
      </li>
    </ul>
  </div>
</nav>
<router-outlet></router-outlet>

```

## EXTRA : add alert in newTeam
- in NewTeamComponent add:
```angular2html
  message: string;
  showMessage: boolean;
  messageClass: string;
  
  (...)
  
   create() {
      this.teamService.create(this.team).subscribe(result => {
          this.team = {};
          this.message = 'Team saved';
          this.messageClass = 'alert alert-success';
          this.showMessage = true;
        },
        error1 => {
          console.log(error1);
          this.message = error1.message;
          this.messageClass = 'alert alert-danger';
          this.showMessage = true;
        }
      );
    }
```

- in HTML add:
```angular2html
<div class={{messageClass}} role="alert" *ngIf="showMessage">
  {{message}}
</div>
```

## Angular Material

### Install
* $ npm install --save @angular/material @angular/animations @angular/cdk
* $ npm install --save hammerjs

Add hammerjs to angular-cli.json in node "apps":
````
"scripts": [
   "../node_modules/hammerjs/hammer.min.js"
 ],
````
hammerjs is library which recognized gesture made by touch, mouse, pointer events. 
 
### Add material forms with inputs to existing page
````
<div>
  <h4>Add new team using material style</h4>
  <form>
    <mat-form-field>
      <input matInput placeholder="Team name" id="teamNameMaterial" name="teamName"[(ngModel)]="team.name">
    </mat-form-field>
    <div>
      <button mat-raised-button color="primary" (click)="create()">Add</button>
    </div>
  </form>
</div>
````
In global style.css import style sheet:

```@import '~@angular/material/prebuilt-themes/indigo-pink.css';```

Add in section "imports" required module - in this example add to my-team.module.ts:

```angular2html
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

(...)

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
```

Open page where you can add team. 

### Add material list to existing page

Add required module to my-team.module.ts:
```angular2html

(...)

    MatTableModule,
    MatPaginatorModule,
```

Add some codes in team-list.component.html
```angular2html
<div>
  <h4>Teams by angular material</h4>
  <mat-table [dataSource]="dataSource" >

    <ng-container matColumnDef="teamName">
      <mat-header-cell *matHeaderCellDef> Team name</mat-header-cell>
      <mat-cell *matCellDef="let row"> {{row.name}}</mat-cell>
    </ng-container>

    <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
    <mat-row *matRowDef="let row; columns: displayedColumns;">
    </mat-row>
  </mat-table>

  <mat-paginator [pageSizeOptions]="[5, 10, 25, 100]"></mat-paginator>
</div>

```

Add some codes in team-list.component.ts
```angular2html

  displayedColumns = ['teamName'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.teamService.getAll().subscribe(results => {
        this.teams = results;
        this.dataSource = new MatTableDataSource<any>(this.teams);
        this.dataSource.paginator = this.paginator;
      },
      error1 => {
        console.log('Error:' + error1);
      }
    );
  }

```

When you see below error:

```ERROR in node_modules/@angular/cdk/a11y/typings/focus-monitor/focus-monitor.d.ts(117,30): error TS2315: Type 'ElementRef' is not generic.```

then set in package.json same version for library:
```angular2html
"@angular/material": "^5.2.0",
"@angular/core": "^5.2.0",
"@angular/cdk": "^5.2.0",
```



## USEFUL LINKS
- https://getbootstrap.com/docs/4.1/getting-started/introduction/ 
- https://angular.io/guide/quickstart 

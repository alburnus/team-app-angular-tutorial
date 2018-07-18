import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TeamListComponent} from './team-list/team-list.component';
import {NewTeamComponent} from './new-team/new-team.component';

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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyTeamRoutingModule {
}

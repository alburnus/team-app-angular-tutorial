import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyTeamRoutingModule} from './my-team-routing.module';
import {TeamListComponent} from './team-list/team-list.component';
import {NewTeamComponent} from './new-team/new-team.component';
import {TeamService} from './team.service';

@NgModule({
  imports: [
    CommonModule,
    MyTeamRoutingModule
  ],
  declarations: [TeamListComponent, NewTeamComponent],
  providers: [TeamService]
})
export class MyTeamModule {
}

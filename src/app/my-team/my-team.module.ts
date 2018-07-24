import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyTeamRoutingModule} from './my-team-routing.module';
import {TeamListComponent} from './team-list/team-list.component';
import {NewTeamComponent} from './new-team/new-team.component';
import {TeamService} from './team.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MyTeamRoutingModule,
    FormsModule,
  ],
  declarations: [TeamListComponent, NewTeamComponent],
  providers: [TeamService]
})
export class MyTeamModule {
}

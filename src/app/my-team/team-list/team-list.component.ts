import {Component, OnInit} from '@angular/core';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(private teamService: TeamService) {
  }

  teams: Array<any>;

  ngOnInit() {
    this.teamService.getAll().subscribe(results => {
        this.teams = results;
      },
      error1 => {
        console.log('Error:' + error1);
      }
    );
  }

}

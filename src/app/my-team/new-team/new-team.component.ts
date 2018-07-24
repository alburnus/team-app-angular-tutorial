import {Component, OnInit} from '@angular/core';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  team: any = {};

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
  }

  create() {
    this.teamService.create(this.team).subscribe(result => {
        this.team = {};
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}

import {Component, OnInit} from '@angular/core';
import {TeamService} from '../team.service';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  team: any = {};
  message: string;
  showMessage: boolean;
  messageClass: string;

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
  }

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
}

import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from '../team.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  constructor(private teamService: TeamService) {
  }

  teams: Array<any>;
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

}

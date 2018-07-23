import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TeamService {

  private apiUrl = 'http://localhost:8080/api/team';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.apiUrl);
  }
}

import { Component, OnInit } from '@angular/core';
import { Fixture } from '../models/Fixture';
import { RestapiService } from '../services/restapi.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Team } from '../models/Team';
import { from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { invalid } from '@angular/compiler/src/render3/view/util';

const source = from([
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 20 },
  { name: 'Ryan', age: 50 }
]);


  // grab each persons name, could also use pluck for this scenario
  const example = source.pipe(map(({ name }) => name));
  // output: "Joe","Frank","Ryan"
 // const subscribe = example.subscribe(val => console.log(val));


@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss']
})
export class FixturesComponent implements OnInit {
public model: Fixture;
// tslint:disable-next-line:max-line-length
public venues = ['Emirates Stadium', 'Old Trafford', 'Etihad Stadium', 'Anfield', 'Vitality Stadium', 'Turf Moor', 'Stamford Bridge', 'Selhurst Park', 'Amex Stadium', 'Goodison Park', 'King Power Stadium', 'St. James Park', 'St. Marys Stadium', 'Totenham Hotspur Stadium', 'London Stadium', 'Molineux Stadium'];
public teams: Team [];
public clubs: string [];
public fixtures = [];
public teams$: any;
public invalid: boolean;

minDate = new Date().getDate();
maxDate = new Date(2020, 0, 1);

  constructor(private restapiService: RestapiService) { }

  ngOnInit() {
    this.getTeams();
    this.getFixtures();
    this.model = new Fixture();
    this.clubs = [];
    this.venues.sort();
    this.invalid = false;
  }

  getFixtures(): void {
    this.restapiService.findAllFixtures()
          .subscribe(data => this.fixtures = data);
  }

  getTeams(): void {
    this.restapiService.findAllTeams()
          .subscribe(data => {
              this.teams = data;

              data.forEach(element => {
                this.clubs.push(element.name);
              });
            });
  }

  onSubmit(): void {
    this.invalid = false;

    if (this.model.homeTeam === this.model.awayTeam) {
      this.invalid = true;
     } else {
       console.log('validation complete ');
       this.restapiService.saveFixture(this.model);
     }
  }

  createFixture(): void {
  }
}

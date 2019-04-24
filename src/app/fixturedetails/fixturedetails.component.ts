import { Component, OnInit, ViewChild } from '@angular/core';
import { Fixture } from '../models/Fixture';
import { Team } from '../models/Team';
import { RestapiService } from '../services/restapi.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-fixturedetails',
  templateUrl: './fixturedetails.component.html',
  styleUrls: ['./fixturedetails.component.scss']
})
export class FixturedetailsComponent implements OnInit {
  public model: Fixture;
  public dataSource = new MatTableDataSource<Fixture>();
  tableSource: Fixture[];
  opt: any;
  public displayedColumns = ['venue', 'timestamp', 'homeTeam', 'awayTeam', 'add'];

  public fixtures = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    constructor(private restapiService: RestapiService,  private router: Router) { }

    ngOnInit() {
      this.getFixtures();

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    getFixtures(): void {
      this.restapiService.findAllFixtures()
            .subscribe(data => {
                this.fixtures = data;
                this.dataSource.data = data;
            });
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    onSelect(value: string): void {
       this.router.navigate(['fixtures/add']);
    }

    addTickets(fixture: Fixture): void {
      console.log(fixture);
       if (fixture !== undefined) {

        // tslint:disable-next-line:no-unused-expression

        const navigationExtras: NavigationExtras = {
          queryParams: {
              'id': fixture.id,
              'name': fixture.name
          }
      };
        this.router.navigate(['tickets/add'], navigationExtras);
        // redirect to tickets
      }
    }
}

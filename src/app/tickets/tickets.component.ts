import { Component, OnInit, Input } from '@angular/core';
import { AvailableTickets } from '../models/AvailableTickets';
import { RestapiService } from '../services/restapi.service';
import { Fixture } from '../models/Fixture';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  public model = new AvailableTickets();
  public fixture = new Fixture();
  public fixtureNames: string [];
  public fixtures: Fixture [];
  public invalidPrice: boolean;
  public invalidQauntity: boolean;
  public name: string;
  public minVal: number;
  public maxVal: number;

  fixtureId: number;
  navigation: any;

  constructor(private restapiService: RestapiService,  private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.fixture.id = params['id'];
      this.fixture.name = params['name'];
  });
   }

  ngOnInit() {
    this.getFixtures();
    this.fixtureNames = [];
    this.minVal = 1;
    this.maxVal = 50;
    this.navigation = this.router.getCurrentNavigation();
    console.log(this.fixture);
  }

  getFixtures(): void {
    this.restapiService.findAllFixtures()
    .subscribe(data => {
      this.fixtures = data;

      data.forEach(element => {
        // this.fixtureNames.push(element.name + ':  Scheduled for,  ' + element.timestamp);
        this.fixtureNames.push(element.name + ',  ' + element.id);
      });
    });
  }

  onSubmit(): void {
    console.log('form submitted');
    console.log('fixture:' + this.fixture.name);

    this.invalidPrice = false;
    this.invalidQauntity = false;

    if (this.model.price < 1) {
      this.invalidPrice = true;
    }

    if (this.model.quantityAvailable < 1 || this.model.quantityAvailable  > 50 ) {
      this.invalidQauntity = true;
    }

    if (!this.invalidPrice && !this.invalidQauntity) {
      this.model.fixtureId = Number(this.fixture.id);

      this.model.price = Number(this.model.price);
      this.model.quantityAvailable = Number(this.model.quantityAvailable);

      console.log('validation complete =>' + this.model.fixtureId);
      this.restapiService.saveTicket(this.model);
     }

    // if (this.name !== undefined) {
    //     const fxId = this.name.split(',')[1].trim();
    //     console.log(fxId);
    //     this.fixtureId =  Number(fxId);

    //   if (this.fixtures !== undefined) {
    //     const filteredFixtures = this.fixtures.filter(f => f.id === Number(fxId));
    //     console.log(filteredFixtures);
    //   }



  //  }
  }

  createTicket(): void {
  }

}

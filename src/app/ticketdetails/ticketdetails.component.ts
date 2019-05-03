import { Component, OnInit, ViewChild } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { AvailableTickets } from '../models/AvailableTickets';
import { MatTab, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TicketFixtures } from '../models/TicketFixtures';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.scss']
})
export class TicketdetailsComponent implements OnInit {
public model: AvailableTickets;
public ticketFixtures: TicketFixtures;
public ticketList: TicketFixtures [];
public dataSource: MatTableDataSource<AvailableTickets>;
 // ticketEntity// = new TicketFixtures();

// tslint:disable-next-line:max-line-length
public displayedColumns = ['fixtureId', 'timestamp', 'quantityAvailable', 'isAvailable', 'edit'];

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

  constructor(private restapiService: RestapiService ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.getAllTickets();
    this.ticketList = [];
    // this.ticketEntity = new TicketFixtures();

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllTickets(): void {
    this.restapiService.findAllTickets().subscribe(data => {
      // data.forEach(element => {
      //   this.restapiService.findAllFixtures().subscribe(fx => {
      //     fx.forEach(item => {
      //       if (item.id === element.fixtureId) {

      //        const ticketEntity = new TicketFixtures();
      //       // this.model.fixtureId = item.id;

      //       ticketEntity.ticketId = element.ticketId;
      //       ticketEntity.block = element.block;
      //       ticketEntity.fixtureName = item.name;
      //       ticketEntity.category = element.category;
      //       ticketEntity.isAvailable = element.isAvailable;
      //       ticketEntity.price = element.price;
      //       ticketEntity.timestamp = element.timestamp;
      //       ticketEntity.quantityAvailable = element.quantityAvailable;
      //       ticketEntity.row = element.row;

      //       this.ticketList.push(ticketEntity);

      //       }

      //     });
      //   });
      // });

     this.dataSource.data = data;
     console.log(this.ticketList);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(ticket: AvailableTickets): void {

  }

}

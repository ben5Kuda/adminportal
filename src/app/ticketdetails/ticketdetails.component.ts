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
 // ticketEntity = new TicketFixtures();

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
      data.forEach(element => {
        this.restapiService.findAllFixtures().subscribe(fx => {
          fx.forEach(item => {
            if (item.id === element.fixtureId) {

            // this.model.fixtureId = item.id;
            // this.ticketEntity.ticketId = element.ticketId;
            // this.ticketEntity.block = element.block;
            // this.ticketEntity.fixtureName = item.name;
            // this.ticketEntity.category = element.category;
            // this.ticketEntity.isAvailable = element.isAvailable;
            // this.ticketEntity.price = element.price;
            // this.ticketEntity.timestamp = element.timestamp;
            // this.ticketEntity.quantityAvailable = element.quantityAvailable;
            // this.ticketEntity.row = element.row;

            // this.ticketList.push(this.ticketEntity);

            }

          });
        });
      });

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

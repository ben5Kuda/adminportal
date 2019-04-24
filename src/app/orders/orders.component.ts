import { Component, OnInit, ViewChild } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../models/Order';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { all } from 'q';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

 constructor(private restapiService: RestapiService, public dialog: MatDialog) { }

 public orderObs$: Observable<Order[]>;
 public displayedColumns = ['orderId', 'paymentConfirmed', 'name', 'delete'];
 orders: Order[];
 singleOrder: Order;
 tableSource: Order[];

 oid: number;
 order: Order;
 public source = [];
 message: string;

 public profileForm  = new FormGroup({
  orderid: new FormControl(Validators.required),
  name: new FormControl(Validators.required)
});


   public dataSource = new MatTableDataSource<Order>();
   public model = new Order();

   orderid = new FormControl(Validators.required);
   name = new FormControl();
   pay = new FormControl();

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getAllOrders();

     this.tableSource = [];
   console.log('starting');
   this.dataSource.paginator = this.paginator;
   this.dataSource.sort = this.sort;
   console.log(this.tableSource);
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    console.log('destroying');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, message: this.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.message = result;
    });
  }

  getAllOrders(): void {
    this.orderObs$ = this.restapiService.findAllOrders();

     this.restapiService.findAllOrders()
        .subscribe(data => { this.orders = data;
           this.source = this.orders;

           this.orders.forEach(element => {
            this.tableSource.push(element);

          });
            console.log(this.tableSource);
            this.dataSource.data = this.tableSource;

    });
    console.log('retrieving orders');

   }

   createOrder(): string {
     console.log(this.model.name + '=> from component');
   this.restapiService.saveOrder(this.model);
    return 'Order created =>' + this.model.name;
  }

  edit(id: any): void {
    console.log(id);
  }

  filter(searchValue: string): void {
    console.log(searchValue);
    if (searchValue !== undefined) {
        this.restapiService.findOrderByName(searchValue).subscribe(order => {
          console.log(order);
          this.dataSource.data.push(order);
        });
    }
  }

onSubmit() {
  console.log('submitted');
}

}

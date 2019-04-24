import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { FixturesComponent } from '../fixtures/fixtures.component';
import { HomeComponent } from '../home/home.component';
import { OrdersComponent } from '../orders/orders.component';
import { UsersComponent } from '../users/users.component';
import { TicketsComponent } from '../tickets/tickets.component';
import { FixturedetailsComponent } from '../fixturedetails/fixturedetails.component';
import { TicketdetailsComponent } from '../ticketdetails/ticketdetails.component';
import { DialogComponent } from '../dialog/dialog.component';
import { ErrorComponent } from '../error/error.component';

const routes: Routes = [

  { path: 'add-fixtures', component: FixturesComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'tickets', component: TicketdetailsComponent },
  { path: 'tickets/add', component: TicketsComponent },
  { path: 'view-fixtures', component: FixturedetailsComponent },
  { path: 'success', component: DialogComponent },
  { path: 'error', component: ErrorComponent },
  { path: '', pathMatch: 'full', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

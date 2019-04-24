import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Fixture } from '../models/Fixture';
import { Order } from '../models/Order';
import { Team } from '../models/Team';
import { OAuthService } from 'angular-oauth2-oidc';
import { AvailableTickets } from '../models/AvailableTickets';

@Injectable({
  providedIn: 'root'
})

export class RestapiService {

  // baseUrl = 'https://localhost:44372/';
  baseUrl = 'https://marketplaceticketingapibeta.azurewebsites.net/';
  fixturesUrl = this.baseUrl + 'v1/GlobalFixtures?';
  ordersUrl = this.baseUrl + 'v1/Orders?';
  teamsUrl = this.baseUrl + 'v1/FootballTeams?';
  usersUrl = this.baseUrl + 'v1/Users?';
  ticketsUrl = this.baseUrl + 'v1/AvailableTickets?';

  apiVersion = 'api-version=1';

  response: Order [];
  test: Fixture;
  responseStatus: number;

  constructor(
    private http: HttpClient, private oauthService: OAuthService) { }

    public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.oauthService.getAccessToken()
      }),
    };

    public saveOrder(order: Order): Subscription  {
      console.log(order.name + '=> saving order');
      return this.http.post<Order>(this.ordersUrl + this.apiVersion, order)
      .pipe(
       // catchError(this.handleError('addOrder', order))
      ).subscribe();
  }

  public saveFixture(fixture: Fixture): Subscription {
    console.log(fixture.venue + '=> saving fixture');
    return this.http.post<Fixture>(this.fixturesUrl + this.apiVersion, fixture)
    .pipe(
      // catchError(this.handleError('addFixture', fixture))
    ).subscribe();
}


public saveTicket(ticket: AvailableTickets): Subscription  {
  console.log(ticket.category + '=> saving ticket');
  return this.http.post(this.ticketsUrl + this.apiVersion, ticket)
  .pipe(
   // catchError(this.handleError('addTicket', ticket))
  ).subscribe();
}
  extractData(response: Response): void {
    console.log(response);
  }

findAllFixtures (): Observable<Fixture[]> {
  return this.http.get<Fixture[]>(this.fixturesUrl + this.apiVersion)
    .pipe(
      map(data => this.response = data['value']),
      tap(t => console.log('fetched fixtures:')),
     // catchError(this.handleError<Fixture[]>('getFixtures', []))
    );
}

findAllTickets (): Observable<AvailableTickets[]> {
  return this.http.get<AvailableTickets[]>(this.ticketsUrl + this.apiVersion)
    .pipe(
      map(data => this.response = data['value']),
      tap(t => console.log('fetched available tickets:')),
     // catchError(this.handleError<AvailableTickets[]>('getTickets', []))
    );
}


findAllTeams (): Observable<Team[]> {
  return this.http.get<Team[]>(this.teamsUrl + this.apiVersion)
    .pipe(
      map(data => this.response = data['value']),
      tap(t => console.log('fetched teams:')),
     // catchError(this.handleError<Team[]>('getTeams', []))
    );
}

findAllOrders (): Observable<Order[]> {
  console.log('getting orders');
  return this.http.get<Order[]>(this.ordersUrl + this.apiVersion)
     .pipe(
      map(data => this.response = data['value']),
      tap(t => console.log('fetched orders:')),
     // catchError(this.handleError<Order[]>('getOrders', []))
   );
}


findOrderByName (name: string): Observable<Order> {
  console.log('getting order by name');
  return this.http.get<Order>(this.ordersUrl + this.apiVersion + '&$filter=orderId eq ' + name)
     .pipe(
      map(data => this.response = data['value']),
      tap(t => console.log('fetched order by name:')),
     // catchError(this.handleError<Order>('getOrderbyName'))
   );
 }


private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(operation + ' failed:' + error.message);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RatingModule} from 'primeng/rating';
import {ProgressBarModule} from 'primeng/progressbar';

import {SidebarModule} from 'primeng/sidebar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {SpinnerModule} from 'primeng/spinner';
import { FixturesComponent } from './fixtures/fixtures.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Services } from '@angular/core/src/view';
import { UsersComponent } from './users/users.component';
import { TicketsComponent } from './tickets/tickets.component';
import { FixturedetailsComponent } from './fixturedetails/fixturedetails.component';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { DialogComponent } from './dialog/dialog.component';
import { ResponseInterceptor } from './services/ResponseInterceptor';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    FixturesComponent,
    HomeComponent,
    OrdersComponent,
    UsersComponent,
    TicketsComponent,
    FixturedetailsComponent,
    TicketdetailsComponent,
    DialogComponent,
    ErrorComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    RatingModule,
    ToastModule,
    ProgressBarModule,
    SpinnerModule,
    SidebarModule,
    CalendarModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [ DialogComponent ],
  entryComponents: [DialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

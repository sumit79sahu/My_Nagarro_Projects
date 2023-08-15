import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import {MatGridListModule} from '@angular/material/grid-list';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import { BookingComponent } from './booking/booking.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';

import { TokenInterceptor } from './interceptor/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BookingComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgbCollapseModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
    ,ModalModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    NgToastModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

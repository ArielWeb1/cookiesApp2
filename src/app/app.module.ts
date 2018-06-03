import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { InMemoryDataService } from './in-memory-data.service';
import { AppRoutingModule } from './/app-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PlacesComponent } from './places/places.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import {PlaceService} from './place.service';
import { MessagesComponent } from './messages/messages.component';
import { PlaceSearchComponent } from './place-search/place-search.component';
import { MessageService } from './message.service';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    PlaceDetailsComponent,
    MessagesComponent,
    DashboardComponent,
    PlaceSearchComponent
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [PlaceService, MessageService, InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

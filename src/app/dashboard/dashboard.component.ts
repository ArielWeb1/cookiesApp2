import { Component, OnInit } from '@angular/core';
import {Place} from '../Place';
import {PlaceService} from '../place.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  places: Place[] = [];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces()
      .subscribe(places => this.places = places.sort((left, right): number => {
        if (left.numberOfCoffie < right.numberOfCoffie ) {
          return -1; }
        if (left.numberOfCookies > right.numberOfCookies) {
          return 1; }
          return 0;
      }).slice(1, 5));
    console.log(this.places);
  }
}

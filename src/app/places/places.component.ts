import { Component, OnInit } from '@angular/core';

import {Place} from '../Place';
import {PlaceService} from '../place.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  placesTitle = 'Place Names';
  places: Place[];

  constructor(private placeService: PlaceService) { }

  ngOnInit() {
    this.getPlaces();
  }

  getPlaces(): void {
    this.placeService.getPlaces()
      .subscribe(places => this.places = places);
    console.log(this.places);
  }

// add a new place
  add(name: string): void {
    name = name.trim();

    if (!name) { return; }
    this.placeService.addPlace({name} as Place).subscribe(place => {
        this.places.push(place);
      console.log(this.places);
        });
}

  delete(place: Place): void {
    this.places = this.places.filter(h => h !== place);
    this.placeService.deletePlace(place).subscribe();
  }


}

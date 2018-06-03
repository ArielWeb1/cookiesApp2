import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Place } from './Place';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PlaceService {

  private placesUrl = 'api/places';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** GET place by id. Return `undefined` when id not found */
  getPlaceNo404<Data>(id: number): Observable<Place> {
    const url = `${this.placesUrl}/?id=${id}`;
    return this.http.get<Place[]>(url)
      .pipe(
        map(places => places[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} place id=${id}`);
        }),
        catchError(this.handleError<Place>(`getPlace id=${id}`))
      );
  }

  /* GET places whose name contains search term */
  searchPlaces(term: string): Observable<Place[]> {
    if (!term.trim()) {
      // if not search term, return empty place array.
      return of([]);
    }
    return this.http.get<Place[]>(`api/places/?name=${term}`).pipe(
      tap(_ => this.log(`found places matching "${term}"`)),
      catchError(this.handleError<Place[]>('searchPlaces', []))
    );
  }

  /** GET places from the server */
  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.placesUrl).pipe(
      tap(places => this.log(`fetched places`)),
      catchError(this.handleError('getPlaces', []))
    );
  }

  /** get place by ID */
  getPlace(id: number): Observable<Place> {
    const url = `${this.placesUrl}/${id}`;
    this.messageService.add(`PlaceService: fetched place id=${id}`);
    return this.http.get<Place>(url).pipe(
      tap(_ => this.log(`fetched place id=${id}`)),
      catchError(this.handleError<Place>('getPlace id=${id'))
    );
  }

  /** POST: add a new place to the server */
  addPlace (place: Place): Observable<any> {
    return this.http.post<Place>(this.placesUrl, place, httpOptions).pipe(
      tap((place: Place ) => this.log(`added place id=${place.id}`)),
      catchError(this.handleError<Place>('addPlace'))
    );
  }

  /** PUT: update the place on the server */
  updatePlace (place: Place): Observable<any> {
    return this.http.put<Place>(this.placesUrl, place, httpOptions).pipe(
      tap(_ => this.log(`updated place id=${place.id}`)),
      catchError(this.handleError<Place>('updatePlace'))
    );
  }

  /** DELETE: delete the place from the server */
  deletePlace (place: Place | number): Observable<Place> {
    const id = typeof place === 'number' ? place : place.id;
    const url = `${this.placesUrl}/${id}`;

    return this.http.delete<Place>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted place id=${id}`)),
      catchError(this.handleError<Place>('deletePlace'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PlaceService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PlaceService: ' + message);
  }
}

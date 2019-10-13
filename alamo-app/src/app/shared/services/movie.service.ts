import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class MovieService {
  
  constructor(private http: HttpClient) {
    
  }

  // Get Movie Data
  public getMovieData(): Observable<any> {
      return this.http.get('https://drafthouse.com/s/mother/v1/page/market/main/austin') 
        .pipe(
            tap(data => data), 
            catchError(err => {return Observable.throw(Error);})
        );
  }

  
}
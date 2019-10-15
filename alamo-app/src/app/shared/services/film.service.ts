import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class FilmService {
  
  constructor(private http: HttpClient) {
    
  }

  // Get Film Data
  public getFilmData(): Observable<any> {
      return this.http.get('https://drafthouse.com/s/mother/v1/page/market/main/austin') 
        .pipe(
            tap(data => data), 
            catchError(err => {return Observable.throw(err);})
        );
  }

  
}
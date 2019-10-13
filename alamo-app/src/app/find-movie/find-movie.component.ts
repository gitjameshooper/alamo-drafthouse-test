import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription, combineLatest, fromEvent } from 'rxjs';
import { tap, mapTo, share } from 'rxjs/operators';
import { CinemaModel, MovieModel } from '../shared/all-models.models';
import { ArraySortPipe } from '../shared/pipes/sort.pipe';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'find-movie',
  templateUrl: './find-movie.component.html',
  styleUrls: ['./find-movie.component.scss'],
  providers: [ArraySortPipe]
})
export class FindMovieComponent implements OnInit{
  public cinemas$: Observable<Array<CinemaModel>> = new Observable;
  private movieSource: Subject<Array<MovieModel>> = new Subject();
  private sharedData = this.movieService.getMovieData().pipe(share());
  public movies$: Observable<Array<MovieModel>> = new Observable;

  	
  constructor(private movieService: MovieService, private sortPipe:ArraySortPipe){
  }
 public ngOnInit() {
 	
   	this.cinemas$ = this.sharedData.map((d) => {
   		
   		let cinemas = this.sortPipe.transform(d.data.market.cinemas, 'name');
   		let activeCinemaId = cinemas[0].id;

   		this.movieSource.next(activeCinemaId);
   		return d.data.market.cinemas;
   	});

   	this.movies$ = combineLatest(this.movieSource.asObservable(), this.sharedData)
  	.map((d)=>{
  		console.log(d[0]);
  		let activeCinemaId = d[0],
  		    sessions = d[1].data.sessions,
   				films = d[1].data.films,
   		    	filmHeadOfficeCodes = [],
   		    	theaterFilms = [];

   		sessions.forEach((session) => {
   			if(activeCinemaId === session.cinemaId){
   				filmHeadOfficeCodes.push(session.filmHeadOfficeCode);
   			}
   		});

   		// Filter Duplicate Codes
   	 	filmHeadOfficeCodes = Array.from(new Set(filmHeadOfficeCodes));
   		// console.log(filmHeadOfficeCodes);
   	    films.forEach((film) => {
   			if(filmHeadOfficeCodes.indexOf(film.headOfficeCode) >= 0){
   				theaterFilms.push(film);
   			}
   		});

   		return theaterFilms;
  });
   }

   public changeTheater(cinemaId){
   	   this.movieSource.next(cinemaId);
   }
 
   
}

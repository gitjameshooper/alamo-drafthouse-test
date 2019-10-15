import { Component, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { share } from 'rxjs/operators';
import { CinemaModel, FilmModel, FilmSourceModel } from '../shared/all-models.models';
import { ArraySortPipe } from '../shared/pipes/sort.pipe';
import { FilmService } from '../shared/services/film.service';

@Component({
  selector: 'find-film',
  templateUrl: './find-film.component.html',
  styleUrls: ['./find-film.component.scss'],
  providers: [ArraySortPipe]
})
export class FindFilmComponent implements OnInit{
  public cinemas$: Observable<Array<CinemaModel>> = new Observable;
  public films$: Observable<Array<FilmModel>> = new Observable;
  public activeCinema = {id: undefined, name: undefined};
  private filmSource: Subject<FilmSourceModel> = new Subject();
  private sharedData = this.filmService.getFilmData().pipe(share());


  constructor(private filmService: FilmService, private sortPipe:ArraySortPipe){
  }
 public ngOnInit() {
   	this.cinemas$ = this.sharedData.map((d) => {
   		// Sort Cinemas Alpahbetically
   		let cinemas = this.sortPipe.transform(d.data.market.cinemas, 'name');
   		this.activeCinema = {"id":cinemas[0].id, "name":cinemas[0].name };
      
   		this.filmSource.next(this.activeCinema);
   		return d.data.market.cinemas;
   	});

   	this.films$ = combineLatest(this.filmSource.asObservable(), this.sharedData)
  	.map((d)=>{
  		   let sessions = d[1].data.sessions,
   				films = d[1].data.films,
   		    filmHeadOfficeCodes = [],
   		    cinemaFilms = [];
          this.activeCinema = {"id":d[0].id, "name":d[0].name };
      // Loop through sessions to get film head office codes
   		sessions.forEach((session) => {
   			if(this.activeCinema.id === session.cinemaId){
   				filmHeadOfficeCodes.push(session.filmHeadOfficeCode);
   			}
   		});

   		// Filter Duplicate Office Codes
   	 	filmHeadOfficeCodes = Array.from(new Set(filmHeadOfficeCodes));
   	  
      // Loop through films to get films playing in the active cinema
      films.forEach((film) => {
   			if(filmHeadOfficeCodes.indexOf(film.headOfficeCode) >= 0){
   				cinemaFilms.push(film);
   			}
   		});

   		return cinemaFilms;
  });
   }

   public changeCinema(activeCinema){
   	   this.filmSource.next(activeCinema);
   }
  
}

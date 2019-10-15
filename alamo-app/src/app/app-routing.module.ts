import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FindFilmComponent } from './find-film/find-film.component';


@NgModule({
  imports: [
    /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    RouterModule.forRoot([
    	      {
        path: '',
        component: FindFilmComponent,
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


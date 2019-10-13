import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindMovieComponent } from './find-movie.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    FindMovieComponent,
  ],
  exports: [FindMovieComponent]
})
export class FindMovieModule {}


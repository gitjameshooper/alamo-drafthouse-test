import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindFilmComponent } from './find-film.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    FindFilmComponent,
  ],
  exports: [FindFilmComponent]
})
export class FindFilmModule {}


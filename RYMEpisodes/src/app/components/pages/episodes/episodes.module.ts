import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { EpisodesListComponent } from '@episodes/episodes-list/episodes-list.component';

const myComponents = [EpisodesListComponent];

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [...myComponents],
})
export class EpisodesModule { }

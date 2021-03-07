import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EpisodesListComponent } from './episodes-list.component';

const routes: Routes = [{ path: '', component: EpisodesListComponent }];
console.log('routes',routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EpisodesListRoutingModule { }

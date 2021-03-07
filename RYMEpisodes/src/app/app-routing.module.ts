import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    redirectTo:'home',
    pathMatch:'full'
  },
  { 
    path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) 
  }, 
  { 
    path: 'episodes-list', loadChildren: () => 
    import('./components/pages/episodes/episodes-list/episodes-list.module')
    .then(m => m.EpisodesListModule) 
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter, take } from 'rxjs/operators';

import { Episodes } from '@app/shared/interfaces/episodes.interfaces';
import { EpisodeService } from '@app/shared/services/episode.service';


type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css']
})
export class EpisodesListComponent implements OnInit {
  episodes: Episodes[] = [];
  info: RequestInfo = {
    next: null,
  };
  showGoUpButton = false;
  private pageNum=1;
  private query:string;
  private hideScrollHeight;
  private showScrollHeight;

  constructor(
    @Inject(DOCUMENT) private document:Document, 
    private episodeSvc: EpisodeService, 
    private route:ActivatedRoute, 
    private router:Router) { 
    this.onUrlChanged();
  }

  ngOnInit() {
    this.getEpisodesByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll():void{
    const yOffSet = window.pageYOffset;
    if((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight ){
      this.showGoUpButton = true;
    }else if(this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight ){
      this.showGoUpButton = false;
    }
    
  }

  onScrollDown():void{
    if(this.info.next){
      this.pageNum++;
      this.getDataFromServices();
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.episodes = [];
        this.pageNum = 1;
        this.getEpisodesByQuery();
      });
  }

  private getEpisodesByQuery(): void{
    this.route.queryParams.pipe(take(1))
    .subscribe((params:ParamMap) => {
      this.query = params['q'];
      this.getDataFromServices();
    });
  }

  private getDataFromServices():void{
    this.episodeSvc.searchEpisodes(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((res: any) => {
      
      if(res.results.length){
        const {info, results} = res;
        this.episodes = [...this.episodes, ...results];
        this.info = info;
      }else{
        this.episodes = [];
      }  
    });
  }
}

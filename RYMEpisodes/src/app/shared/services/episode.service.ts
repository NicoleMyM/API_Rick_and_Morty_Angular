import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { Episodes } from '@shared/interfaces/episodes.interfaces';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(private http: HttpClient) { }

  searchEpisodes(query = '', page = 1){
    return this.http.get<Episodes[]>(
      `${environment.baseUrlAPI}/?name=${query}&page=${page}`)
  }

  getDetails(id: number){
    return this.http.get<Episodes>(
      `${environment.baseUrlAPI}/${id}`)
  }
}

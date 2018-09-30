import { Injectable } from '@angular/core';
import { NetService } from './net-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieInfoProviderService {

  constructor(private netService: NetService) { }

  provideSearchResults(query: string): Observable<any> {
    return this.netService.getSearchResults(query);
  }

  provideMovieInfo(imdbID: string): Observable<any> {
    return this.netService.fetchSpecificMovie(imdbID);
  }

  handleError(err?: Error) {
    console.error(`Warning error occured while getting the data from the server, message: ${err.message}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from '../../models';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NetService {
  apiUrl: string = "http://www.omdbapi.com/" 
  constructor(private http: HttpClient) { }

   getSearchResults(query: string): Observable<any>{
      return this.http.get(`${this.apiUrl}?s=${query}&page=1-2&${API_KEY}`);
   }

   fetchSpecificMovie(imdbID: string): Observable<any>{
     return this.http.get(`${this.apiUrl}?i=${imdbID}&${API_KEY}`);
   }
}

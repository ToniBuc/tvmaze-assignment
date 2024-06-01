import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvmazeService {

  private apiBaseUrl: string = "https://api.tvmaze.com";

  constructor(private httpClient: HttpClient) { }

  public searchShows(searchInput: string): Observable<any> {
    const params = {
      q: searchInput
    }

    return this.httpClient.get(`${this.apiBaseUrl}/search/shows`, {params});
  }
}

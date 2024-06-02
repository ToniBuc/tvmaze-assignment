import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

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

    return this.httpClient.get(`${this.apiBaseUrl}/search/shows`, {params}).pipe(catchError(this.handleError));;
  }

  public getShowDetails(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiBaseUrl}/shows/${id}`).pipe(catchError(this.handleError));
  }

  public getShowImages(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiBaseUrl}/shows/${id}/images`).pipe(catchError(this.handleError));;
  }

  // should improve error handling
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `TVMaze API returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}

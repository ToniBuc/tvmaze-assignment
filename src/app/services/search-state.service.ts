import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchStateService {

  constructor() { }

    // getters and setters for state retention of list filtering
    getSearchInput(): string | null {
      return sessionStorage.getItem('searchInput');
    }

    setSearchInput(searchInput: string): void {
      sessionStorage.setItem('searchInput', searchInput);
    }
}

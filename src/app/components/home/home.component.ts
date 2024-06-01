import { Component } from '@angular/core';
import { ListComponent } from '../list/list.component';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { TvmazeService } from '../../services/tvmaze.service';
import { SearchStateService } from '../../services/search-state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private subscriptions = new Subscription();
  private search$ = new Subject<string>();

  public searchInput: string = '';
  public showList: any[] = [];

  constructor(
    private tvmazeService: TvmazeService,
    private searchStateService: SearchStateService
  ) {}

  ngOnInit(): void {
    this.searchInput = <string>this.searchStateService.getSearchInput();

    if (this.searchInput) {
      this.searchShows(this.searchInput);
    } else {
      // temp to keep list populated on fresh instance
      this.searchShows('breaking');
    }

    this.subscriptions.add(this.search$.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(() => {
      this.searchShows(this.searchInput);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public searchShows(searchQuery: string): void {
    this.tvmazeService.searchShows(searchQuery).subscribe((data) => {
      console.log(data);
      this.showList = data;
    })
  }

  public emitSearchInput(event: Event): void {
    // searchInput value is passed to the search subject to make sure distinctUntilChanged properly prevents emissions of identical values
    this.searchInput = (event.target as HTMLInputElement).value;
    this.searchStateService.setSearchInput(this.searchInput);
    this.search$.next(this.searchInput);
  }
}

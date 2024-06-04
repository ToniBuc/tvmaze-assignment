import { Component, Input, OnInit } from '@angular/core';
import { TvmazeService } from '../../services/tvmaze.service';
import { CommonModule, NgFor, NgIf, PercentPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TimePipe } from '../../pipes/time.pipe';
import { CastMember, ShowDetails } from '../../types/show';

@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TimePipe,
    PercentPipe,
    CommonModule
  ],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.scss'
})
export class ShowDetailsComponent implements OnInit {
  @Input() id: number | undefined;
  
  public show: ShowDetails | undefined;
  public showBackground: string = '';
  public showCast: CastMember[] = [];
  public sanitizedSummary: SafeHtml = '';

  public errorThrown: boolean = false;
  public errorContent: string = '';

  constructor(
    private tvmazeService: TvmazeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getShowDetails(<number>this.id);
    this.getShowBackground(<number>this.id);
    this.getShowCast(<number>this.id);
  }

  private getShowDetails(id: number): void {
    // this.tvmazeService.getShowDetails(129382190839218391283).subscribe({
    this.tvmazeService.getShowDetails(id).subscribe({
      next: (data) => {
        console.log(data);
        
        this.show = data;
        this.sanitizedSummary = this.sanitizer.bypassSecurityTrustHtml(data.summary);
      },
      error: (error) => {
        console.log(error);
        this.errorThrown = true;
        this.errorContent = error.message;
      }
    });
  }

  private getShowBackground(id: number): void {
    this.tvmazeService.getShowImages(id).subscribe({
      next: (data) => {
        const filteredImages: any[] = data.filter((el: any) => {
          return el.type === 'background';
        })

        if (filteredImages.length > 0) {
          const highestRes = filteredImages.reduce((prev, current) => {
            return (prev.resolutions.original.width > current.resolutions.original.width) ? prev : current;
          });

          this.showBackground = highestRes.resolutions.original.url;
        }
      },
      error: (error) => {
        console.log(error);
        this.errorThrown = true;
        this.errorContent = error.message;
      }
    })
  }

  private getShowCast(id: number): void {
    this.tvmazeService.getShowCast(id).subscribe({
      next: (data) => {
        this.showCast = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
        this.errorThrown = true;
        this.errorContent = error.message;
      }
    })
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { TvmazeService } from '../../services/tvmaze.service';
import { NgFor, NgIf, PercentPipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TimePipe } from '../../pipes/time.pipe';

@Component({
  selector: 'app-show-details',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    TimePipe,
    PercentPipe
  ],
  templateUrl: './show-details.component.html',
  styleUrl: './show-details.component.scss'
})
export class ShowDetailsComponent implements OnInit {
  @Input() id: number | undefined;
  
  public show: any;
  public showBackground: string = '';
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
        } else {
          this.showBackground = this.show.image.original;
        }
      },
      error: (error) => {
        console.log(error);
        this.errorThrown = true;
        this.errorContent = error.message;
      }
    })
  }
}

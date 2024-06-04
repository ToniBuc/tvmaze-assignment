import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Show } from '../../types/show';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    RouterLink,
    CommonModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() showList: Show[] = []
  @Input() infoMessage: string = '';

  constructor() {}

}

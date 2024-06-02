import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {
  transform(value: number | undefined): any {
    if (value) {
      const hours = Math.floor(value / 60);
      const minutes = Math.floor(value % 60);
      if (hours > 0) {
        if (minutes > 0){
          return hours + ' h ' + minutes + ' m';
        }
        
        return hours + ' h';
      } else {
        return minutes + ' m';
      }
    }

    return null;
  }
}

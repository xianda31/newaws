import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {

  transform(size: number) {
    if (size < 1024) {
      return size + ' octets';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + ' Ko';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(1) + ' Mo';
    } else {
      return (size / (1024 * 1024 * 1024)).toFixed(1) + ' Go';
    }
  }
}



import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smaller'
})
export class SmallerPipe implements PipeTransform {

  transform(string: string,): string {
    return string.replace("h2>", "h4>");
  }

}

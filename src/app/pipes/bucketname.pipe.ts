import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bucketname'
})
export class BucketnamePipe implements PipeTransform {

  hostname: string = "https://bcstoapp0ee6a242edb74c79a78263aa5cb1473e113936-dev.s3.eu-west-3.amazonaws.com";
  transform(url: string): string {
    return url.replaceAll('https://HOSTNAME', this.hostname);
  }

}

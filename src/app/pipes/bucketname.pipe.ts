import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'bucketname'
})
export class BucketnamePipe implements PipeTransform {
  BucketName = environment.BucketName;
  Region = environment.Region;
  hostname = 'https://' + this.BucketName + '.s3.' + this.Region + '.amazonaws.com';
  transform(url: string): string {
    // return url;
    return url.replaceAll('%HOSTNAME%', this.hostname);
  }

}

import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  config = {
    ADD_ATTR: ['height', 'width', 'alt', 'src', 'style', 'title'],
    ADD_TAGS: [],
    ADD_URI_SAFE_ATTR: ['href'],
  }

  constructor(protected sanitizer: DomSanitizer) { }

  public transform(dirty: any): any {

    const sanitized = DOMPurify.sanitize(dirty, this.config);

    if (DOMPurify.removed.length > 0) {
      // console.log("DOMsanitizer has removed %s tags ", DOMPurify.removed.length);
    }
    return this.sanitizer.bypassSecurityTrustHtml(sanitized); // on y croit , plus aucun controle !!

  }

}

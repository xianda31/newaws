import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  purifyConfig = {
    ADD_ATTR: ['height', 'width', 'alt', 'src', 'style', 'title', 'target'],
    ADD_TAGS: ['div', 'span', 'a', 'img', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'tbody'],
    // ADD_DATA_URI_TAGS: ['a', 'area'],
    ADD_URI_SAFE_ATTR: ['href'],
  }


  constructor(
    protected DOMsanitizer: DomSanitizer
  ) { }

  public transform(dirty: any): any {

    const purified = DOMPurify.sanitize(dirty, this.purifyConfig);

    if (environment.sanitizer_verbose && DOMPurify.removed.length > 0) {
      console.log("DOMpurity has removed %s tags ", DOMPurify.removed.length);
      console.log(DOMPurify.removed);
    }
    // maintenant on peut retourner la valeur purifiée
    return this.DOMsanitizer.bypassSecurityTrustHtml(purified);
  }

}

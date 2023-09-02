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
    // const sanitized = DOMPurify.sanitize(dirty);
    // return this.sanitizer.bypassSecurityTrustHtml(sanitized);

    // return this.sanitizer.bypassSecurityTrustHtml(dirty);  // aucun controle !!

    const sanitized = DOMPurify.sanitize(dirty, this.config);
    return this.sanitizer.bypassSecurityTrustHtml(sanitized);



    return this.sanitizer.sanitize(SecurityContext.HTML, sanitized); // bloque les balises <script> et <style> mais pas les attributs style et onclick
  }

}

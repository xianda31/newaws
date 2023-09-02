import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string = '';
  @Input() summary: string = '';
  @Input() body: string = '';

  config = {
    ADD_ATTR: ['height', 'width', 'alt', 'src', 'style', 'title'],
    ADD_TAGS: [],
    ADD_URI_SAFE_ATTR: ['href'],
  }

  sanitizedBody: string = '';
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sanitizedBody = DOMPurify.sanitize(this.body, this.config);
    if (DOMPurify.removed.length > 0) {

      console.log("%s : DOMsanitizer would removed : ", this.title, DOMPurify.removed);
    }



  }
}

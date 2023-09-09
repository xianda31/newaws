import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as DOMPurify from 'dompurify';
import { Article } from 'src/app/API.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(
    private router: Router,
  ) { }

  @Input() article!: Article;


  viewArticle() {
    console.log('viewArticle()');
    this.router.navigate(['/articles', this.article.id]);

  }

}

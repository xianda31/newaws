import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { Article, Category } from 'src/app/API.service';
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
  @Input() category !: Category;


  viewArticle() {
    console.log('viewArticle()', this.article);
    this.router.navigate(['/articles', this.article.id]);

  }

}

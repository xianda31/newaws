import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mosaiker',
  templateUrl: './mosaiker.component.html',
  styleUrls: ['./mosaiker.component.scss']
})
export class MosaikerComponent implements OnChanges {

  @Input('title') label!: string;
  @Input('description') description!: string;

  articles$!: Observable<Article[]>;
  authenticatedUser: boolean = false;

  constructor(
    private articleService: ArticleService,
    private router: Router

  ) { }
  ngOnChanges(changes: SimpleChanges): void {

    // console.log('mosaiker changes', changes['description'].currentValue);


    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.category!.label === this.label))
    );
  }


  selectArticle(article: Article) {
    this.router.navigate(['/page', article.category!.label, article.id]);
  }
}

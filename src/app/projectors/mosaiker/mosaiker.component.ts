import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { Router } from '@angular/router';
import { PageService } from 'src/app/aws.services/page.aws.service';



@Component({
  selector: 'app-mosaiker',
  templateUrl: './mosaiker.component.html',
  styleUrls: ['./mosaiker.component.scss']
})
export class MosaikerComponent implements OnChanges {

  @Input('pageId') pageId!: string;

  articles$!: Observable<Article[]>;
  authenticatedUser: boolean = false;
  page!: Page;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private pageService: PageService,

  ) { }
  ngOnChanges(changes: SimpleChanges): void {

    // console.log('mosaiker changes', changes['pageId'].currentValue);
    this.page = this.pageService.sgetPage(changes['pageId'].currentValue);

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.page.id))
    );
  }


  selectArticle(article: Article) {
    this.router.navigate(['/page', article.page!.label, article.id]);
  }
}

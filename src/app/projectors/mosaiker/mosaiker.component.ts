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
  solo !: boolean;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private pageService: PageService,

  ) { }
  ngOnChanges(changes: SimpleChanges): void {

    this.page = this.pageService.sgetPage(changes['pageId'].currentValue);    // tant qu'amplify ne gère pas les relations, on doit faire ça
    console.log('mosaiker page', this.page);

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.page.id))
    );

    this.articles$.subscribe((articles) => {
      console.log('mosaiker articles', articles.length);
      this.solo = articles.length === 1;

    }
    );
  }


  selectArticle(article: Article) {
    this.router.navigate(['/page', article.page!.label, article.id]);
  }
}

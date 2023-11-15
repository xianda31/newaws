import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Router } from '@angular/router';
import { PageService } from 'src/app/aws.services/page.aws.service';



@Component({
  selector: 'app-mosaiker',
  templateUrl: './mosaiker.component.html',
  styleUrls: ['./mosaiker.component.scss']
})
export class MosaikerComponent implements OnChanges {

  @Input('root') root!: string;
  @Input('menu') menu!: string;

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
    let path = '';
    if (changes['root']) {
      path = changes['root'].currentValue ? changes['root'].currentValue + '/' : '';
      console.log('root : ', changes['root'].currentValue);
    }

    console.log('menu', changes['menu'].currentValue);

    path += (changes['menu'].currentValue ?? '');
    console.log('loading page %s', path);

    let page: Page | undefined;
    page = this.pageService.sgetPageByPath(path);
    if (page == undefined) {
      this.router.navigate(['404']);
      return;
    } else {
      this.page = page;
      console.log('mosaiker page  = %o', this.page);
    }

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.page.id)),
      tap((articles) => {
        console.log('mosaiker articles', articles);
        this.solo = articles.length === 1;

      })
    );

  }


  selectArticle(article: Article) {
    this.router.navigate(['/page', this.page!.label, article.id]);
  }
}

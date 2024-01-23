import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnChanges {

  @Input('root') root!: string;
  @Input('menu') menu!: string;

  articles$!: Observable<Article[]>;

  authenticatedUser: boolean = false;
  page!: Page;
  selectedArticle!: Article;
  allInSide: boolean = true;


  constructor(
    private articleService: ArticleService,
    private router: Router,
    private pageService: PageService,

  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    // console.log('pager changes', changes);
    let path = '';
    if (changes['root']) {
      path = changes['root'].currentValue === undefined ? '' : changes['root'].currentValue + '/';
    } else {
      path = this.root === undefined ? '' : this.root + '/';
    }

    path += (changes['menu'].currentValue ?? '');

    let page: Page | undefined;
    page = this.pageService.sgetPageByPath(path);

    if (page === undefined) {
      console.log('%s not found :o( ', path)
      this.router.navigate(['404']);
      return;
    } else {
      this.page = page;
    }

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.page.id)),
      map((articles) => articles.sort((a, b) => (a.rank < b.rank ? 1 : -1))),
      tap((articles) => {
        // console.log('pager articles', articles);
        // this.solo = articles.length === 1;
        this.selectedArticle = articles[0];

      })
    );

  }


  selectArticle(article: Article) {
    // console.log('selectArticle', article);
    this.selectedArticle = article;
  }
}


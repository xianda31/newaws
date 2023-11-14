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


    console.log(changes['root'].currentValue, '/', changes['menu'].currentValue);
    let path = changes['root'].currentValue ? changes['root'].currentValue + '/' : '';
    path += (changes['menu'].currentValue ?? '');

    this.page = this.pageService.sgetPageByPath(path);
    // console.log('mosaiker page %s = %o', changes['menu'].currentValue, this.page);

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.page.id)),
      tap((articles) => {
        console.log('mosaiker articles', articles);
        this.solo = articles.length === 1;

      })
    );

    // this.articles$.subscribe((articles) => {
    //   console.log('mosaiker articles', articles.length);
    //   this.solo = articles.length === 1;

    // }
    // );
  }


  selectArticle(article: Article) {
    this.router.navigate(['/page', this.page!.label, article.id]);
  }
}

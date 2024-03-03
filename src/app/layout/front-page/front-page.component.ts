import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent implements OnChanges {

  @Input('menu') menu!: string;
  @Input('submenu') submenu!: string;
  root: string = '';

  articles$!: Observable<Article[]>;
  selectedArticle: Article | null = null;

  authenticatedUser: boolean = false;
  page!: Page;
  picturesInCol: boolean = true;  // utile ??


  constructor(
    private articleService: ArticleService,
    private router: Router,
    private pageService: PageService,

  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    // console.log('calling menu :%s  submenu:%s', changes['menu'].currentValue, changes['submenu'].currentValue);
    if (changes['menu']) {
      this.root = changes['menu'].currentValue;
    }
    let path = this.root;

    if (changes['submenu']) {
      if (changes['submenu'].currentValue) {
        path += '/' + changes['submenu'].currentValue;
      }
    }


    let page: Page | undefined;
    page = this.pageService.sgetPageByPath(path);

    if (page === undefined) {
      console.log('%s not found :o( ', path)
      this.router.navigate(['404']);
      return;
    } else {
      this.page = page;
      if (this.page.articles && this.page.articles.items.length > 0) {
        this.selectedArticle = this.page.articles.items.reduce((acc, article) => (acc && article && (acc.rank > article.rank) ? acc : article));
      } else {
        this.selectedArticle = null;
      }
    }

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.page.id)),
      map((articles) => articles.sort((a, b) => (a.rank > b.rank ? 1 : -1))),
      tap((articles) => {
        this.selectedArticle = articles[0];
      })
    );
  }


  selectArticle(article: Article) {
    // console.log('selectArticle', article);
    this.selectedArticle = article;
  }
  getMonth(date: Date | string): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    let d = new Date(date);
    let m = d.getMonth();
    return months[m];
    // return date.toLocaleString('fr-FR', { month: 'short' });
  }
  getDayOfTheMonth(date: string): number {
    let d = new Date(date);
    return d.getDate();
  }
  getFolder(article: Article): string {
    return '';
  }

  getmenu(article: Article) {
    return article.directory ?? '';
  }
}

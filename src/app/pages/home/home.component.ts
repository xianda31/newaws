import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  article$!: Observable<Article[]>;
  authenticatedUser: boolean = false;
  home!: Page;


  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private router: Router

  ) { }

  async ngOnInit(): Promise<void> {

    this.article$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.featured))
    );

    this.home = this.pageService.getPageByLabel('Home');

  }

  selectArticle(article: Article) {
    this.router.navigate(['/page', article.page!.label, article.id]);
  }
}

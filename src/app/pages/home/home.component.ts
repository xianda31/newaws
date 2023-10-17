import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  article$!: Observable<Article[]>;
  authenticatedUser: boolean = false;
  home!: Category;


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private router: Router

  ) { }

  async ngOnInit(): Promise<void> {

    this.article$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.featured))
    );

    this.home = this.categoryService.getCategoryByLabel('Home');

  }

  selectArticle(article: Article) {
    this.router.navigate(['/cat', article.category!.label, article.id]);
  }
}

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
  articles$: Observable<Article[]> = this.articleService.articles$;

  articles: Article[] = [];
  authenticatedUser: boolean = false;
  // selectedArticle!: Article;

  selectedCategory!: Category;


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private cognitoService: CognitoService,
    private router: Router

  ) { }

  async ngOnInit(): Promise<void> {

    // this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
    //   this.authenticatedUser = user ? true : false;
    //   console.log('this.authenticatedUser', this.authenticatedUser);
    // });



    this.articles$.pipe(
      map((articles) => articles.filter((article) => article.featured))
    ).subscribe((articles) => {
      this.articles = articles;
    });

    this.selectedCategory = this.categoryService.getCategoryByLabel('Home');

  }

  selectArticle(article: Article) {
    const selectedArticle = article;
    this.router.navigate(['/cat', selectedArticle.category!.label, selectedArticle.id]);
  }
}

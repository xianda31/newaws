import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
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

  selectedCategory: Category = {
    id: '',
    label: 'Home',
    description: 'Home descrption',
    createdAt: '',
    updatedAt: '',
    rank: 0,
    mandatory: true,
    __typename: 'Category',
  };

  constructor(
    private articleService: ArticleService,
    private cognitoService: CognitoService,
    private router: Router

  ) { }


  ngOnInit(): void {

    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
      this.authenticatedUser = user ? true : false;
    });

    this.articles$.pipe(
      map((articles) => articles.filter((article) => article.featured))
    ).subscribe((articles) => {
      this.articles = articles;
    });

  }

  selectArticle(article: Article) {
    const selectedArticle = article;
    console.log('selectedArticle', selectedArticle.permalink, selectedArticle.id);
    this.router.navigate(['/cat', selectedArticle.category!.label, selectedArticle.id]);
  }
}
